import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";
import api from "../../services/api";
import { StackParamsList } from "../../routes/authenticated.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RouteParams = {
    Order: {
        table: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteParams, 'Order'>;

type CategoryProps = {
    id: string, 
    name: string
}
type ProductProps = {
    id: string, 
    name: string
}
type ItemProps = {
    item_id: string;
    product_id: string;
    product_name: string;
    amount: string | number;
}


export default function Order(){
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [amount, setAmount] = useState('0')

    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()

    const [products, setProducts] = useState<ProductProps[]>([])
    const [productSelected, setProductSelected] = useState<ProductProps>()

    const [modalCategoryVisibility, setModalCategoryVisibility] = useState(false)
    const [modalProductVisibility, setModalProductVisibilit] = useState(false)

    const [items, setItems] = useState<ItemProps[]>([])

    useEffect(() => {
        async function loadCategories(){
            const response = await api.get('/category')

            
            setCategories(response.data)
            setCategorySelected(response.data[0])
        }   

        loadCategories()
    }, [])

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()
    }, [categorySelected])

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    async function handleRemoveItem(item_id: string){
        const response = await api.delete('/order/item', {
            params: {
                item_id: item_id
            }
        })

        let data = items.filter((item) => item.item_id !== item_id)

        setItems(data)
    }

    async function handleAddItem(){

        if (categorySelected?.id === '' || categorySelected?.name === '' || productSelected?.id === '' || productSelected?.name === '' || amount === '0') {
            return;
        }

        const response = await api.post('/order/item', {
            amount: Number(amount),
            order_id: route.params.order_id,
            product_id: productSelected?.id
        })

        let data = {
            item_id: response.data.id,
            product_id: productSelected?.id as string,
            product_name: productSelected?.name as string,
            amount: amount 
        }

        setItems(oldArray => [...oldArray, data])
    }

    async function handleCloseOrder() {
        const response = await api.delete('order', {
            params: {
                order_id: route.params?.order_id
            }
        })

        navigation.goBack()
    }

    async function handleFinishOrder() {
        navigation.navigate('FinishOrder', {table: route.params.table, order_id: route.params.order_id})
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" style={styles.trashButton}/>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.choosenOption} onPress={() => setModalCategoryVisibility(true)}>
                <Text style={styles.optionText}>
                    {categorySelected?.name}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.choosenOption} onPress={() => setModalProductVisibilit(true)}>
                <Text style={styles.optionText}>
                    {productSelected?.name}
                </Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                    style={styles.qtdInput}
                    placeholderTextColor='#F0F0F0'
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.finalButtons}>
                <TouchableOpacity style={styles.plusButton} onPress={handleAddItem}>
                    <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.advanceButton, {opacity: items.length === 0 ? 0.3 : 1}]} disabled={items.length === 0} onPress={handleFinishOrder}>
                    <Text>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) =>item.product_id}
                renderItem={({item}) => <ListItem item={item} handleRemoveItem={handleRemoveItem}/>}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisibility}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={() => setModalCategoryVisibility(false)}
                    options={categories}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisibility}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={() => setModalProductVisibilit(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingHorizontal: 20,
    },
    header: {
        marginVertical: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 35,
        color: '#FFF',
        fontWeight: 'bold'
    },
    trashButton: {
        color: 'red',
        fontSize: 25,
        marginLeft: 15
    },
    choosenOption: {
        height: 40,
        color: '#FFF',
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#101026',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    optionText: {
        color: '#FFF',
    },
    qtdContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtdText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        width: '35%'
    },
    qtdInput: {
        height: 40,
        width: '60%',
        color: '#FFF',
        marginLeft: '5%',
        backgroundColor: '#101026',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'center',
    },
    finalButtons: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    plusButton: {
        minWidth: '25%',
        backgroundColor: '#3fd1ff',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        borderRadius: 4
    }, 
    advanceButton: {
        minWidth: '70%',   
        backgroundColor: '#3fffa3', 
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        borderRadius: 4,
    }
})
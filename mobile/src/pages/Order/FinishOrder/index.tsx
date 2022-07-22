import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import api from "../../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../../routes/authenticated.routes";

type RouteParams = {
    FinishOrder: {
        table: string | number;
        order_id: string;
    }
}

type FinishOrderProp = RouteProp<RouteParams, 'FinishOrder'>

export default function FinishOrder(){

    const route = useRoute<FinishOrderProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinishOrder(){
        try {
            await api.put('/order/send', {
                order_id: route.params.order_id
            })
            
            navigation.popToTop()
        } catch(err){
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pressione o botão para confirmar conclusão do pedido</Text>
            <Text style={styles.text}>MESA:  {route.params.table}</Text>
            <TouchableOpacity style={styles.finishOrderButton} onPress={handleFinishOrder}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather name="shopping-cart" style={styles.shoppingCartButton}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingHorizontal: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#FFF',
        fontSize: 20,
    },
    finishOrderButton: {
        backgroundColor: '#3fffa3',
        marginVertical: 24,
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 4,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        fontWeight: 'bold'
    },
    shoppingCartButton: {
        fontSize: 20
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 15
    }
})
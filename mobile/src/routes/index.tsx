import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AuthenticatedRoutes from "./authenticated.routes";
import NonAuthenticatedRoutes from "./noAuthenticated.routes";

function Routes(){
    const {isAuthenticated, loading} = useContext(AuthContext)

    if(loading){
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1d1d2e'
                }}
            >
                <ActivityIndicator size={60} color="#FFF"/>

            </View>
        )
    }

    return(
        isAuthenticated ? <AuthenticatedRoutes /> : <NonAuthenticatedRoutes/>
    )
}

export default Routes
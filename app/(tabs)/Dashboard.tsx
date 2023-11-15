import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { pegarProdutos } from '../../services/product.service';
import { pegarVendas } from '../../services/venda.service';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Dashboard = () => {
    const [data, setData]:any = useState([]);
    const [vendas, setVendas]: any = useState([]);
    const [saldo, setSaldo]:any = useState(0);

    const pegarVendasDados = async () => {
        const resp = await pegarVendas();
        setVendas(resp.data);
        if(resp.status == 200){
            let i = 0;
            data.map((item:any) => {
                resp.data.map((item2:any) => {
                    if(item.id == item2.selectedCar){
                        console.log(item.preco)
                        i += parseFloat(item2.quantity) * parseFloat(item.preco);
                    }
                })
            });
            setSaldo(i);
        }
    }


    const getData = async() => {
        const resp = await pegarProdutos();
        setData(resp.data);
    }

  useFocusEffect(
    useCallback(() => {
        (async() => {
            await getData();
            await pegarVendasDados();
        })();
    },[saldo])
  )

    return(
        <SafeAreaView>
            <ScrollView style={styles.container} >
                <View style={styles.card} >
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10}}>
                        <Text style={styles.cardTitle}>Produtos: </Text>
                        <Text style={styles.cardTitle}>{data.length}</Text>
                    </View>
                </View>
                <View style={styles.card} >
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10}}>
                        <Text style={styles.cardTitle}>Vendas: </Text>
                        <Text style={styles.cardTitle}>{vendas.length}</Text>
                    </View>
                </View>
                <View style={styles.card} >
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10}}>
                        <Text style={styles.cardTitle}>Saldo: </Text>
                        <Text style={styles.cardTitle}>{saldo}MT</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    card:{
        backgroundColor:"#555",
        padding:20,
        borderRadius:10,
        margin:10
    },
    cardBody:{

    },
    cartContent:{

    },
    cardTitle:{
        color:"#fff",
        fontSize:22
    },
    cardDate:{

    },
    container:{
        
    },
    cardSubtitle:{
        color:"#fff",
        fontSize:12
    },
    price:{
        fontSize:25,
        color:"#fff"
    }
});

export default Dashboard;
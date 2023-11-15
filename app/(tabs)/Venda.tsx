import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { apagarVenda, pegarVendas } from '../../services/venda.service';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Venda = () => {
    const [vendas, setVendas]: any = useState([]);

    const { navigate }: any = useNavigation();

    const pegarVendasDados = async () => {
        const resp = await pegarVendas();
        setVendas(resp.data);
    }

    const handleDelete = async(id:number) => {
        const resp = await apagarVenda(id);
        alert(resp.data);
        if(resp.status == 200){
            await pegarVendasDados();
        }
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await pegarVendasDados();
            })();
        }, [])
    );

    return (
        <SafeAreaView>
            <ScrollView style={styles.container} >
                {
                    vendas?.map((item: any,i:any) => {
                        return (
                            <View key={i} style={styles.card} >
                                 <Text style={{fontSize:15,color:"#fff"}}>Estoque: {item.quantity}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                                    <Text style={styles.cardTitle}>ID do Carro:</Text>
                                    <Text style={styles.cardTitle}>{item.selectedCar}</Text>
                                </View>
                                {/* <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Modelo:</Text>
                                    <Text style={{ color: "#fff", fontSize: 18 }}>101001</Text>
                                </View> */}
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Cliente:</Text>
                                    <Text style={{ color: "#fff", fontSize: 18 }}>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                                    {/* <Text style={styles.price}>{}</Text> */}
                                    <Text style={{ fontSize: 15, color: "#fff" }}>{(new Date(item?.date)).toDateString()}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <FontAwesome name="trash" color={"red"} size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
            <TouchableOpacity style={styles.btn} onPress={() => navigate("AddVenda")}>
                <Text style={styles.btnText}>Adicionar Nova Venda</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#555",
        padding: 20,
        borderRadius: 10,
        margin: 10
    },
    cardBody: {

    },
    cartContent: {

    },
    cardTitle: {
        color: "#fff",
        fontSize: 22
    },
    cardDate: {

    },
    container: {
        height: (Dimensions.get("screen").height - 300)
    },
    cardSubtitle: {
        color: "#fff",
        fontSize: 12
    },
    price: {
        fontSize: 25,
        color: "#fff"
    },
    btn: {
        backgroundColor: "purple",
        padding: 20,
        margin: 15,
        borderRadius: 10
    },
    btnText: {
        fontSize: 17,
        textAlign: "center",
        color: "#fff"
    }
});

export default Venda;
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { apagarProduto, pegarProdutos } from '../../services/product.service';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Home = () => {
    const [data, setData]: any = useState([]);

    const getData = async () => {
        const resp = await pegarProdutos();
        setData(resp.data);
    }

    const handleDelete = async (id: any) => {
        const resp = await apagarProduto(id);
        alert(resp.data);
        if (resp.status == 200) {
            await getData();
        }
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await getData();
            })();
        }, [])
    )
    return (
        <SafeAreaView>
            <ScrollView style={styles.container} >
                {
                    data.map((item: any) => {
                        return (
                            <View style={styles.card} key={item.id}>
                                 <Text style={{ fontSize: 15, color: "#fff" }}>ID: {item.id}</Text>
                                <Text style={{ fontSize: 15, color: "#fff" }}>Estoque: {item.stock}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                                    <Text style={styles.cardTitle}>Marca:</Text>
                                    <Text style={styles.cardTitle}>{item.marca}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Modelo:</Text>
                                    <Text style={{ color: "#fff", fontSize: 18 }}>{item.modelo}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                                    <Text style={styles.price}>{item.preco}MT</Text>
                                    <Text style={{ fontSize: 15, color: "#fff" }}>Ano de fabrico: {item.ano}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                                    <Text style={{ fontSize: 15, color: "#fff" }}>Data: {new Date(item.createdAt).toDateString()}</Text>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <FontAwesome name="trash" color={"red"} size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
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

    },
    cardSubtitle: {
        color: "#fff",
        fontSize: 12
    },
    price: {
        fontSize: 25,
        color: "#fff"
    }
});

export default Home;
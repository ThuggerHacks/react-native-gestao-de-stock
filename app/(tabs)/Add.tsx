import React from 'react';
import { useState } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput,TouchableOpacity,View } from "react-native";
import { adicionarProduto, pegarProdutos } from '../../services/product.service';

const Add = () => {
    const [marca, setMarca]:any = useState("");
    const [modelo, setModelo]:any = useState("");
    const [cor, setCor]:any = useState("");
    const [preco, setPreco]:any = useState("0");
    const [ano,setAno]:any = useState("0");
    const [stock, setStock]:any = useState("1");

    const handleAddProduct = async() => {
        const obj = {
            marca,
            modelo,
            cor,
            preco,
            ano,
            stock,
            createdAt:(new Date()),
            id:Math.round(Math.random()*999999999)
        }

        if(marca.trim() == "" || modelo.trim() == "" || cor.trim() == "" || preco == 0 || stock == 0 || ano < 1700){
            alert("Por favor preencha todos os campos correctamente!");
            return;
        }

        const resp = await adicionarProduto(obj);
        alert(resp.data);
        if(resp.status == 200){
            setMarca("");
            setModelo("");
            setAno(0);
            setCor("");
            setStock(0);
            setPreco(0)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <TextInput value={marca} style={styles.input} placeholderTextColor={"#fff"} placeholder="Insira Marcar" onChangeText={setMarca}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput value={modelo} style={styles.input} placeholderTextColor={"#fff"} placeholder="Insira Modelo"  onChangeText={setModelo}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput  value={cor} style={styles.input} placeholderTextColor={"#fff"} placeholder="Insira a cor " onChangeText={setCor}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput value={preco} style={styles.input} keyboardType={"phone-pad"} placeholderTextColor={"#fff"} placeholder="Insira o preço " onChangeText={setPreco}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput value={ano} style={styles.input} keyboardType={"phone-pad"} placeholderTextColor={"#fff"} placeholder="Ano de fabrico " onChangeText={setAno}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} keyboardType={"phone-pad"} placeholderTextColor={"#fff"} placeholder="Quantidade " value={stock} onChangeText={setStock}/>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={handleAddProduct}>
                    <Text style={styles.btnText}>Adicionar Carro</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formGroup:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        gap:10,
        marginBottom:20
    },
    label:{
        color:"#fff",
        fontSize:15
    },
    input:{
        borderWidth:1,
        borderColor:"#ebebebeb",
        borderStyle:"solid",
        width:"100%",
        padding:10,
        borderRadius:10,
        color:"#fff"
    },
    form:{
      backgroundColor:"#222",
      padding:20,
      borderRadius:15
    },
    container:{
        flex:1,
        height:Dimensions.get("screen").height,
        width:Dimensions.get("screen").width,
        padding:20,
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        backgroundColor:"purple",
        padding:20,
        marginTop:10,
        borderRadius:10
    },
    btnText:{
        fontSize:17,
        textAlign:"center",
        color:"#fff"
    }
});

export default Add;
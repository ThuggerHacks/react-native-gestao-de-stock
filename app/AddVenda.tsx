import React, { useCallback, useState } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput,TouchableOpacity,View } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { pegarProdutos } from '../services/product.service';
import { useFocusEffect } from '@react-navigation/native';
import { adicionarVenda } from '../services/venda.service';

const Add = () => {
  const [selectedCar, setSelectedCar] = useState("0");
  const [quantity, setQuantity]:any = useState("1");
  const [name, setName]:any = useState("");
  const [products, setProducts]:any = useState([]);

  const [data, setData]:any = useState([]);

  const getData = async() => {
      const resp = await pegarProdutos();
      setData(resp.data);
      setSelectedCar(data[0]?.id);
  }

  const handleAddVenda = async() => {

    if(quantity == 0 || name.trim() == "" || selectedCar == "0"){
        alert("Por favor preencha todos os campos!");
        return;
    }
    const obj = {
        quantity,
        name,
        selectedCar,
        id:Math.round(Math.random()*9999999999),
        date:(new Date())
    };
    const resp = await adicionarVenda(obj);
    alert(resp.data);
    if(resp.status == 200){
        setName("");
        setQuantity(1);
        setSelectedCar("0");
    }
  }


  useFocusEffect(
      useCallback(() => {
          (async() => {
              await getData();
          })();
      },[])
  )

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} placeholderTextColor={"#fff"} placeholder="Nome do Cliente" onChangeText={setName} value={name}/>
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} keyboardType={"phone-pad"} placeholderTextColor={"#fff"} placeholder="Quantidade" onChangeText={setQuantity} value={quantity}/>
                </View>
                <Picker
                  style={{backgroundColor:"#fff"}}
                  itemStyle={{backgroundColor:"#fff",color:"#000"}}
                  mode="dialog"
                  selectedValue={selectedCar}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCar(itemValue)
                  }>
                     <Picker.Item  label="Selecione o carro" value="0" />
                    {
                        data.map((item:any) => {
                            return (
                                <Picker.Item key={item.id} label={item.marca+":"+item.modelo} value={item.id} />
                            );
                        })
                    }
                </Picker>

                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={handleAddVenda}>
                    <Text style={styles.btnText}>Adicionar Nova Venda</Text>
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
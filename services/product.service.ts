import AsyncStorage from '@react-native-async-storage/async-storage';

export const adicionarProduto = async(produto:any) => {
    try {
        // await AsyncStorage.clear()
        const prod = await AsyncStorage.getItem("producto");
        const data = prod?JSON.parse(prod):[];
        data.push(produto);
        await AsyncStorage.setItem("producto",JSON.stringify(data));
        return {data:"Inserido com sucesso",status:200}
    } catch (error) {
        return { data: "Erro ao inserir", status:401};
    }
}

export const pegarProdutos = async() => {
    const resp:any = await AsyncStorage.getItem("producto");

    if(!resp){
        return { data:[], status:401};
    }

    return { data:  JSON.parse(resp), status:200};
}

export const apagarProduto = async(id:any) => {
    const p = await pegarProdutos();

    if(p.data.length == 0){
        return { data: "Erro ao apagar produto", status:401}
    }

   const data = p.data.filter((item:any) => item.id != id );
   await AsyncStorage.setItem("producto",JSON.stringify(data));
   return {data:"Apagado com sucesso",status:200}

}
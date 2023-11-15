import AsyncStorage from '@react-native-async-storage/async-storage';
import { pegarProdutos } from './product.service';

// Função para adicionar uma venda
export const adicionarVenda = async (venda: any) => {
  try {
    // Pegar vendas existentes do armazenamento local
    const vendas = await AsyncStorage.getItem('vendas');
    const data = vendas ? JSON.parse(vendas) : [];

    // Verificar se há estoque disponível para a venda
    const estoqueDisponivel = await verificarEstoque(venda.selectedCar, venda.quantity);

    if (estoqueDisponivel) {
      // Atualizar o estoque subtraindo a quantidade vendida
      await diminuirEstoque(venda.selectedCar, venda.quantity);

      // Adicionar a venda à lista de vendas
      data.push(venda);

      // Salvar as vendas de volta no armazenamento local
      await AsyncStorage.setItem('vendas', JSON.stringify(data));

      return { data: 'Venda realizada com sucesso', status: 200 };
    } else {
      return { data: 'Estoque insuficiente para realizar a venda', status: 401 };
    }
  } catch (error) {
    console.log(error)
    return { data: 'Erro ao realizar a venda', status: 401 };
  }
};

// Função para obter a lista de vendas
export const pegarVendas = async () => {
  const resp: any = await AsyncStorage.getItem('vendas');

  if (!resp) {
    return { data: [], status: 401 };
  }

  return { data: JSON.parse(resp), status: 200 };
};

// Função para excluir uma venda
export const apagarVenda = async (id: any) => {
  const vendas = await pegarVendas();

  if (vendas.data.length === 0) {
    return { data: 'Erro ao apagar venda', status: 401 };
  }

  // Encontrar a venda pelo ID
  const venda = vendas.data.find((item: any) => item.id === id);

  if (venda) {
    // Restaurar a quantidade vendida ao estoque
    //await aumentarEstoque(venda.selectedCar, venda.quantity);

    // Remover a venda da lista de vendas
    const data = vendas.data.filter((item: any) => item.id !== id);
    await AsyncStorage.setItem('vendas', JSON.stringify(data));

    return { data: 'Venda apagada com sucesso', status: 200 };
  } else {
    return { data: 'Venda não encontrada', status: 401 };
  }
};

// Função para verificar se há estoque disponível para uma venda
const verificarEstoque = async (produtoId: any, quantidade: number) => {
  const prod: any = await pegarProdutos();
  const filter = prod.data.filter((prodItem: any) => prodItem.id === produtoId && +prodItem.stock >= quantidade);
 
  return filter.length > 0
};


// Função para diminuir o estoque após uma venda
const diminuirEstoque = async (produtoId: any, quantidade: number) => {
    const prod:any = await pegarProdutos();
    
    prod.data.map((item:any,i:any) => {
        if(item.id == produtoId){
            prod.data[i].stock = +item.stock - quantidade;
        }
    });
    await AsyncStorage.setItem("producto",JSON.stringify(prod.data));
};

// Função para aumentar o estoque ao apagar uma venda
const aumentarEstoque = async (produtoId: any, quantidade: number) => {
    const prod:any = await pegarProdutos();
    
    prod.data.map((item:any,i:any) => {
        if(item.id == produtoId){
            prod.data[i].stock = +item.stock + quantidade;
        }
    });
    await AsyncStorage.setItem("producto",JSON.stringify(prod.data));
};

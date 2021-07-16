import React, {Component} from 'react';
import {View, Text, Pressable,FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors'
import CoinSearch from './CoinSearch'
class CoinScreen extends Component {
    state = {
        coins:[],
        allCoins:[],
        loading: false
    }
    componentDidMount =  ()=>{
        this.getCoins()

    }
    getCoins = async () =>{
        this.setState({ loading: true })
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        this.setState({coins: res.data})
        this.setState({allCoins: res.data})
        this.setState({ loading: false })        
    }
    handlePress =(coin)=>{
        this.props.navigation.navigate('Coin Detail',{ coin })
    }    
    handleSearch = (query) => {
        const { allCoins } = this.state
        const coinsFilter = allCoins.filter((coin)=>{
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        })
        this.setState({coins: coinsFilter})
    }
    render() {
    const {coins, loading} = this.state
    return (
      <View style={styles.container}>
          <CoinSearch onChange={this.handleSearch}/>
          {loading ? 
          <ActivityIndicator 
            style={styles.loader}
            color={Colors.white}
            size="large"
            
            />
          : null}
          <FlatList
            data={coins}
            renderItem={({item})=>
                <View>
                    <CoinsItem 
                    item={item} 
                    onPress={()=> this.handlePress(item)} />
                </View>
            
            }
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex :1,
        backgroundColor:Colors.blackPearl,

    },
    loader:{
        marginTop:60
    }

})
export default CoinScreen;

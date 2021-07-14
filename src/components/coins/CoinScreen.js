import React, {Component} from 'react';
import {View, Text, Pressable,FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors'
class CoinScreen extends Component {
    state = {
        coins:[],
        loading: false
    }
    componentDidMount = async ()=>{
        this.setState({ loading: true })
        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")
        this.setState({coins: res.data})
        this.setState({ loading: false })

    }

    handlePress =(coin)=>{
        this.props.navigation.navigate('Coin Detail',{ coin })
    }    

    render() {
    const {coins, loading} = this.state
    return (
      <View style={styles.container}>
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
        backgroundColor:Colors.charade,

    },
    loader:{
        marginTop:60
    }

})
export default CoinScreen;

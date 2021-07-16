import { BackgroundColor } from 'chalk';
import React, { Component } from 'react';
import { View,Text,Image, StyleSheet, FlatList, SectionList, Pressable,Alert} from 'react-native';
import Colors from '../../res/colors'
import Http from '../../libs/http'
import CoinMarketItem from './CoinMarketItem'
import Storage from '../../libs/storage';
import { constants } from 'fs';
class CoinDetailScreen extends Component {
    
    state = {
        coin: {},
        markets:[],
        isFavorite:false
    }

    getSymbolIcon = (nameStr) => {
        if (nameStr) {
          const name = nameStr.toLowerCase().replace(' ', '-');
          return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    };
    getSections = (coin) => {
      const data = [
        {
          title: 'Market Cap',
          data: [coin.market_cap_usd],
        },
        {
          title: 'Volume 24hr',
          data: [coin.volume24],
        },
        {
          title: 'Change 24hr',
          data: [coin.percent_change_24h],
        },
      ];
      return data;
    };

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
        const markets = await Http.instance.get(url)
        this.setState({markets})
    }

    componentDidMount() {
        const { coin } = this.props.route.params
        this.getMarkets(coin.id)
        this.props.navigation.setOptions({title: coin.symbol} )
        this.setState({coin},()=>{
          this.getFavorite()
        })

    }
    toogleFavorite = () =>{
      if(this.state.isFavorite){
        this.removeFavorite()
      }else{
        this.addFavorite()
      }
    }
    addFavorite = async() =>{
      const coin = JSON.stringify(this.state.coin)
      const key = `favorite-${this.state.coin.id}`
      const stored = await Storage.instance.store(key,coin)
      if(stored){
        this.setState({isFavorite:true})
        console.log('isfavorite')
      }
    }
    removeFavorite = async() =>{
      Alert.alert("Remove favorite", "Are you sure?",[
        {
          text : "cancel",
          onPress:()=>{},
          style:"cancel"
        },
        {
          text: 'remove',
          onPress:async ()=>{
            const key = `favorite-${this.state.coin.id}`
            await Storage.instance.remove(key)
            this.setState({isFavorite:false})
          },
          style:'destructive'
        }
      ])
    }
    getFavorite= async()=>{
      try{
        const key = `favorite-${this.state.coin.id}`
        const favStr = await Storage.instance.get(key)
        if(favStr != null){
          this.setState({isFavorite:true})
        }
      }catch(err){
        console.log("getFavorites err",err)
      }
    }
    
    render(){
        const { coin, markets,isFavorite } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.subHeader}> 
                  <View style={styles.row}>
                    <Image 
                      style={styles.iconImg}
                      source={{ uri:this.getSymbolIcon(coin.name)}}
                    />
                    <Text style={styles.titleText}>{coin.name}</Text>
                  </View>
                  <Pressable
                    onPress={this.toogleFavorite}
                    style={[
                      styles.btnFavorites,
                      isFavorite? styles.btnFavoriteRemove:styles.btnFavoriteAdd
                    ] }
                  > 
                    <Text 
                      style={styles.btnFavoriteText}
                    >
                      { isFavorite?'Remove favorites': 'Add favorites'}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.sectionList}>
                 <  SectionList
                    styles= {styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) =>
                        <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({section}) =>
                        <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                    />
                </View>
                <Text style={styles.marketTitle}>Markets</Text>             
                <FlatList 
                  style={styles.marketList}
                  horizontal={true}
                  data={markets}
                  renderItem={({item})=> <CoinMarketItem item={item}/>}
                  keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.charade,
      flex: 1,
    },
    subHeader: {
      backgroundColor: 'rgba(0,0,0, 0.1)',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent:'space-between'
    },
    titleText: {
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 8,
      color: Colors.white,
      textAlign: 'center',
    },
    iconImg: {
      width: 35,
      height: 35,
    },
    section:{
      maxHeight: 300,
    },
    sectionList: {

      maxHeight: 300,
      flex: 1,
      justifyContent: 'center',
      
    },
    sectionHeader: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      padding: 8,
    },
    sectionItem: {
      padding: 8,
    },
    sectionText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
    },
    marketList:{
      maxHeight: 100,
    },
    marketTitle:{
      color:'#fff',
      fontSize:16,
      marginBottom:16,
      marginLeft:16,
      fontWeight:'bold',
    },
    btnFavorites:{
      padding:8,
      borderRadius:8
    },
    btnFavoriteAdd:{
      backgroundColor:Colors.picton
    },
    btnFavoriteRemove:{
      backgroundColor:Colors.carmine
    },
    btnFavoriteText:{
      color:Colors.white
    },
    row:{
      flexDirection:'row'
    }

  });
export default CoinDetailScreen;
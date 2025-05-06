import React from "react";
import type { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";

type currencybtnprops = PropsWithChildren<{
    Name: string;
    Flag: string;
}>
const CurrencyButton = (props: currencybtnprops) =>{
    return (
        <View style={styles.buttoncontainer}>
            <Text style = {styles.flag} >{props.Flag}</Text>
            <Text style = {styles.country} >{props.Name}</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    buttoncontainer: {
        alignContent:'center'
    },
    flag:{
        fontSize: 28,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 5

    },
    country:{
        fontSize: 18,
        color: '#2d3436',
        
    }
})

export default CurrencyButton
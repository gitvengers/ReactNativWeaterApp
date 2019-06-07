import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table , Row, Rows } from 'react-native-table-component';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `현재 ${navigation.getParam('city', 'Unknown')} 날씨`,
            headerStyle: {
                backgroundColor: 'cornflowerblue',
            },
            headerTitleStyle: {
                color: '#fff',
            }
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const city = navigation.getParam('city', null);
        // const city = 'Daejeon';

        fetch(`http://192.168.0.161:8080/weather-crawler/current-weathers/by-city-name/${city}`)
            .then(response => response.json())
            .then(info => {
                this.setState({
                    ...info,
                    isLoading: false,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>데이터를 불러오는 중입니다.</Text>
                </View>
            )
        }

        let celsius = this.state.main.temp - 273.15;
        let max_celsius =  this.state.main.temp_max - 273.15;
        let min_celsius =  this.state.main.temp_min - 273.15;
        let humidity =  this.state.main.humidity+"%";
        let state =  this.state.weather[0].main;
        let wind = parseFloat(this.state.wind.speed);
        console.log(celsius);
        console.log(this.state);
        let windchill =13.12+(0.6215*celsius) - 11.37*(wind**0.16) + 0.3965*celsius*(wind**0.16);
        let current_temp_head = ['현재온도', '체감온도'];
        let current_temp_body = [celsius.toFixed(1), windchill.toFixed(1)];
        let min_max_temp_head = ['최저온도', '최고온도'];
        let min_max_temp_body = [min_celsius.toFixed(1), max_celsius.toFixed(1)];

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.name}</Text>
                <Text style={styles.text}>상태: {state}</Text>
                <Text style={styles.text}>습도: {humidity}</Text>
                <Table borderStyle={styles.table}>
                    <Row style={styles.head} textStyle={styles.temp_title} data={current_temp_head}></Row>
                    <Row textStyle={styles.temp} data={current_temp_body}></Row>
                    <Row style={styles.head} textStyle={styles.temp_title} data={min_max_temp_head}></Row>
                    <Row textStyle={styles.temp} data={min_max_temp_body}></Row>
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cornflowerblue',
        paddingTop: 10,
        justifyContent: 'space-between',
    },
    title :{
        fontSize: 40,
        textAlign: 'center',
        color: '#fff',
        elevation: 5,
    },
    text : {
        fontSize: 20,
        color: '#fff',
    },
    table :{
        borderWidth: 1,
        borderColor: '#fff',
    },
    head :{
        backgroundColor: '#808B97',
    },
    temp_title :{
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
    },
    temp:{
        textAlign: 'center',
        fontSize: 50,
        padding: 20,
        color: '#fff',
    }
});
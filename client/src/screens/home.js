import { View, Text, ScrollView, StyleSheet, Touchable, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconSearch, IconMenu } from './assets'
import FastImage from 'react-native-fast-image'
import { setCustomText } from 'react-native-global-props';

const { width } = Dimensions.get('window');

const customTextProps = {
  style: {
    fontFamily: 'Laila-SemiBold',
    color: "white"
  }
};

setCustomText(customTextProps);

const Home = () => {
  const [current, setCurrent] = useState([]);
  const [location, setLocation] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, isLoading] = useState(true);
  const getWeatherInfo = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=63065a5ed1bd4b09856193114242406&q=Surabaya&days=3&aqi=no&alerts=no`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (response.ok) {
        // console.log(data)
        setCurrent(data.current);
        setLocation(data.location);
        setForecast(data.forecast.forecastday)
        isLoading(false)
      } else {

      }

    } catch (error) {

      return

    }
  };

  useEffect(() => {
    getWeatherInfo();
    console.log(forecast);
  }, [])

  return (
    <View style={styles.main}>
      {loading ? (
        <FastImage
          source={require("./assets/images/loading.gif")}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Topbar */}
          <View style={styles.topBar}>

            <View style={[styles.cityContainer, { alignItems: 'flex-start', flex: 0.2 }]}>
              <View style={styles.containerSidebar}>
                <TouchableOpacity>
                  <IconMenu />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cityContainer}>
              <Text style={[customTextProps.style, { fontSize: 20 }]}>{location.name}</Text>
            </View>
            <View style={[styles.cityContainer, { flex: 0.2 }]} />

          </View>
          {/* Topbar */}

          {/* main content */}
          <View>
            <View style={styles.content}>
              <FastImage
                source={require("./assets/images/clear.gif")}
                style={styles.contentGif}
              />
            </View>

            <View style={{ flexWrap: "wrap" }}>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ fontSize: 64, fontFamily: "Laila-SemiBold", color: "white", borderBottomWidth: 1, borderColor: "lightgrey" }}>
                  {current.temp_c}°
                </Text>
              </View>

              <View>
                <Text style={[customTextProps.style, { marginTop: 15 }]}>
                  {current.condition.text}
                </Text>
                <Text style={[customTextProps.style, { marginBottom: 15 }]}>
                  H: 63° | L: 51°
                </Text>
              </View>
            </View>
          </View>
          {/* main content */}

          {/* 2nd section */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

            {/* Today Card */}
            <View style={{ width: 100, alignItems: "center", padding: 10, borderRadius: 20, backgroundColor: "#268696", marginRight: 15 }}>
              <Text>
                TODAY
              </Text>
              <View>
                <FastImage
                  source={{ uri: `https:${current.condition.icon}` }}
                  style={{ width: 60, height: 60 }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>
                  {current.temp_c}°
                </Text>
                <Text style={[customTextProps.style, { fontSize: 10 }]}>
                  {current.condition.text}
                </Text>
              </View>
            </View>
            {/* Today Card */}

            {/* 3-Day Forecast */}
            <View style={{ width: 210, padding: 12, borderRadius: 20, backgroundColor: "#268696" }}>
              <Text>
                3-DAY FORECAST
              </Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={{ uri: `https:${forecast[0].day.condition.icon}` }}
                      style={styles.smallIcon}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={[customTextProps.style, { fontSize: 11 }]}>
                      {forecast[0].day.avgtemp_c}°
                    </Text>
                    <Text style={[customTextProps.style, { fontSize: 8 }]}>
                      {forecast[0].day.condition.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={{ uri: `https:${forecast[1].day.condition.icon}` }}
                      style={{ width: 45, height: 45 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={[customTextProps.style, { fontSize: 11 }]}>
                      {forecast[1].day.avgtemp_c}°
                    </Text>
                    <Text style={[customTextProps.style, { fontSize: 8 }]}>
                      {forecast[1].day.condition.text}
                    </Text>
                  </View>
                </View>

                <View style={styles.weatherCard}>
                  <View style={{ alignItems: "center" }}>
                    <FastImage
                      source={{ uri: `https:${forecast[2].day.condition.icon}` }}
                      style={{ width: 45, height: 45 }}
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={[customTextProps.style, { fontSize: 11 }]}>
                      {forecast[2].day.avgtemp_c}°
                    </Text>
                    <Text style={[customTextProps.style, { fontSize: 8 }]}>
                      {forecast[2].day.condition.text}
                    </Text>
                  </View>
                </View>
              </ScrollView>

            </View>
            {/* 3-Day Forecast */}

          </View>
          {/* 2nd section */}

           {/* 3rd section */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", borderRadius: 15, alignItems: "center", backgroundColor: "#268696", marginTop: 20 }}>
            <View style={{ alignItems: "center", flex: 0.3, borderRadius: 15 }}>
              <Text>
                {current.humidity}%
              </Text>
              <Text>
                Humidity
              </Text>
            </View>
            <View style={{ alignItems: "center", flex: 0.3, borderRadius: 15 }}>
              <Text>
                {current.uv}
              </Text>
              <Text>
                UV
              </Text>
            </View>
            <View style={{ alignItems: "center", flex: 0.3, borderRadius: 15 }}>
              <Text>
                {current.wind_kph} kph
              </Text>
              <Text>
                Wind Speed
              </Text>
            </View>
          </View>
          {/* 3rd section */}

          {/* content */}
        </ScrollView>
      )}


    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#117A8E",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderWidth: 1
  },
  container: {

  },
  containerSidebar: {
    padding: 10,
    backgroundColor: "rgba(122, 178, 178, 0.2)",
    borderRadius: 15,
  },
  cityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },
  cityText: {
    fontFamily: "Laila-SemiBold",
    color: "white",
    fontSize: 20
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentGif: {
    width: 300,
    height: 300
  },
  weatherCard: {
    borderRadius: 15,
    borderColor: "#0D6677",
    padding: 10,
    borderWidth: 1,
    marginRight: 10
  },
  smallIcon: {
    width: 45,
    height: 45
  }
})

export default Home
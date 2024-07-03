import { View, Text, ScrollView, StyleSheet, Touchable, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconSearch, IconMenu } from '../assets'
import FastImage from 'react-native-fast-image'
import { setCustomText } from 'react-native-global-props';
import { ProgressBar } from '@react-native-community/progress-bar-android';

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
  const [localtime, setLocalTime] = useState('');
  const [aqi, setAqi] = useState(0);
  const [aqiBar, setAqiBar] = useState(0);
  const [aqiStatus, setAqiStatus] = useState(['']);
  const [loading, isLoading] = useState(true);
  const [hourly, setHourly] = useState([])

  const calculateAQI = async () => {
    let Ihigh, Ilow, Chigh, Clow, status, color;
    const pm25 = 55
    if (pm25 >= 0 && pm25 <= 12.0) {
        Ilow = 0; Ihigh = 50; Clow = 0; Chigh = 12.0; status="Good"; color="green";
    } else if (pm25 >= 12.1 && pm25 <= 35.4) {
        Ilow = 51; Ihigh = 100; Clow = 12.1; Chigh = 35.4; status="Moderate"; color="yellow";
    } else if (pm25 >= 35.5 && pm25 <= 55.4) {
        Ilow = 101; Ihigh = 150; Clow = 35.5; Chigh = 55.4; status="Unhealty For Sensitive Groups"; color="#ed7a00";
    } else if (pm25 >= 55.5 && pm25 <= 150.4) {
        Ilow = 151; Ihigh = 200; Clow = 55.5; Chigh = 150.4; status="Unhealthy"; color="#b22222";
    } else if (pm25 >= 150.5 && pm25 <= 250.4) {
        Ilow = 201; Ihigh = 300; Clow = 150.5; Chigh = 250.4; status="Very Unhealthy"; color="#69359c";
    } else if (pm25 >= 250.5 && pm25 <= 500.4) {
        Ilow = 301; Ihigh = 500; Clow = 250.5; Chigh = 500.4; status="Hazardous"; color="#50404d";
    } else {
        return 'Invalid PM2.5 value';
    }


    const aqi = ((Ihigh - Ilow) / (Chigh - Clow)) * (pm25 - Clow) + Ilow;
    const result = Math.round(aqi);
    const percentage = ((result / (500 / 100)) / 100 )
    setAqi(result)
    setAqiStatus([status, color]);
    setAqiBar(percentage)
};

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=63065a5ed1bd4b09856193114242406&q=New_york&days=3&aqi=yes&alerts=no`,
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
        setForecast(data.forecast.forecastday);
      } else {
        console.error('Response not OK', response.statusText);
      }

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getLocalTime = async () => {
    const date = location.localtime;
    const timePart = date.split(' ')[1];
    setLocalTime(timePart);
  }

  const getHourlyData = async () => {
    let hourlyData = [];
    const data = forecast[0].hour;
    for (let i = 0; i < data.length; i++) {
      let time = data[i].time.split(' ')[1];
      hourlyData.push(time)
    }
    setHourly(hourlyData);
  }

  useEffect(() => {
    const fetchData = async () => {
      isLoading(true);
      await getWeatherInfo();
      await getLocalTime();
      await getHourlyData();
      await calculateAQI();
      isLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.main}>
      {loading ? (
        <FastImage
          source={require("../assets/images/loading.gif")}
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
                source={require("../assets/images/clear.gif")}
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
          <View style={{ borderRadius: 15, backgroundColor: "#268696", marginTop: 20 }}>
            <View style={{ padding: 15 }}>
              <Text>
                Air Quality
              </Text>
              <View>
                <Text>
                  {aqiStatus[0]} {aqi}
                </Text>
                <ProgressBar
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={aqiBar}
                  color={aqiStatus[1]}
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  Feels like
                </Text>
                <Text>
                  {current.feelslike_c}°
                </Text>
              </View>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  UV
                </Text>
                <Text>
                  {current.uv}
                </Text>
              </View>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  Wind
                </Text>
                <Text>
                  {current.wind_kph} kph
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  Humidity
                </Text>
                <Text>
                  {current.humidity}%
                </Text>
              </View>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  Air Pressure
                </Text>
                <Text>
                  {current.pressure_mb}
                </Text>
              </View>
              <View style={styles.thirdContainer}>
                <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 12 }}>
                  Visibility
                </Text>
                <Text>
                  {current.vis_km} km
                </Text>
              </View>
            </View>
          </View>
          {/* 3rd section */}

          {/* 4rd section */}
          <View style={{ borderRadius: 15, backgroundColor: "#268696", marginTop: 20 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {forecast[0].hour
                  .map((hour, index) => {
                    return (
                      <View style={{ flex: 0.3, padding: 15, alignItems: 'center' }} key={index}>
                        <Text style={{ fontFamily: "Laila-Regular", color: "white", fontSize: 13 }}>
                          {hourly[index]}
                        </Text>
                        <FastImage
                          source={{ uri: `https:${hour.condition.icon}` }}
                          style={{ width: 35, height: 35 }}
                        />
                        <Text style={[customTextProps.style, { marginLeft: 8 }]}>
                          {hour.temp_c}°
                        </Text>
                      </View>
                    )
                  })}
              </View>
            </ScrollView>
          </View>
          {/* 4rd section */}


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
    padding: 30
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
  },
  thirdContainer: {
    flex: 0.3,
    borderRadius: 15,
    padding: 15,
    backgroundColor: "#268696",
  }
})

export default Home
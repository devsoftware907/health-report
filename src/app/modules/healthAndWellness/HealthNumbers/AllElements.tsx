import React from "react";
import {
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
const currentDate = new Date();

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  paramName: string;
  title: string;
  unit: string;
  unit2: string;
  value: string;
  valueTwo: string;
}

interface State {
  value: string;
  valueTwo: string;
}

class HealthNumberItemProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valueTwo: ""
    };
  }
  componentWillMount() {
    AsyncStorage.getItem(this.props.paramName).then(data => {
      if (data != null) {
        let parsed = JSON.parse(data);

        //  console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({
            value: parsed[0].value,
            valueTwo: parsed[0].valueTwo ? parsed[0].valueTwo : ""
          });
        } else {
          AsyncStorage.setItem(
            this.props.paramName,
            JSON.stringify([
              {
                createdAt: currentDate,
                value: "-"
              }
            ]),
            err => {}
          );
        }
      } else {
        AsyncStorage.setItem(
          this.props.paramName,
          JSON.stringify([
            {
              createdAt: currentDate,
              value: "-"
            }
          ]),
          err => {}
        );
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem(this.props.paramName).then(data => {
      if (data != null) {
        let parsed = JSON.parse(data);

        //  console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({
            value: parsed[0].value
          });
        } else {
          AsyncStorage.setItem(
            this.props.paramName,
            JSON.stringify([
              {
                createdAt: currentDate,
                value: "-"
              }
            ]),
            err => {}
          );
        }
      } else {
        AsyncStorage.setItem(
          this.props.paramName,
          JSON.stringify([
            {
              createdAt: currentDate,
              value: "-"
            }
          ]),
          err => {}
        );
      }
    });
  }
  render() {
    if (this.props.title == "-") {
      return (
        <View>
          <View style={{ flex: 1, paddingBottom: 15 }} />
          <TouchableOpacity style={styles.AllItemContainer}>
            <View style={styles.elementsContainerEmpty} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ flex: 1, paddingBottom: 15 }}>
            <Text style={styles.AllItemsTitle}>{this.props.title}</Text>
            <View style={styles.lineBottom} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DashboardPage", {
                title: this.props.title,
                unit: this.props.unit,
                unit2: this.props.unit2,
                paramName: this.props.paramName
              });
            }}
            style={styles.AllItemContainer}
          >
            <View style={styles.elementsContainer}>
              <View style={styles.center}>
                {(this.state.value.length == 0 || this.state.value == "-") && (
                  <Image
                    style={styles.addImage}
                    source={require("../images/health-numbers-icon-01.png")}
                  />
                )}
                {this.state.value.length != 0 && this.state.value != "-" && (
                  <Text style={styles.latestReading}>
                    {this.state.value}{" "}
                    <Text style={styles.latestUnitReading}>
                      {this.props.unit == "-" ? "" : this.props.unit}
                    </Text>
                  </Text>
                )}
                {this.state.valueTwo.length != 0 &&
                  this.state.valueTwo != "-" && (
                    <Text style={styles.latestReading}>
                      {this.state.valueTwo}{" "}
                      <Text style={styles.latestUnitReading}>
                        {this.props.unit == "-" ? "" : this.props.unit}
                      </Text>
                    </Text>
                  )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  nav: state.search
});
const HealthNumberItem = connect(
  mapStateToProps,
  null
)(withNavigation(HealthNumberItemProps));

export default HealthNumberItem;

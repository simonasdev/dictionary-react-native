/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;

class Dictionary extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      input: '',
      translation: '',
    };
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    fetch(this.props.dataSource)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
      }).done();
  }

  setText = (text) => {
    return this.setState({ input: text });
  }

  showMeaning = () => {
    this.setState({
      translation: this.state.data[this.state.input] || 'Not found',
    });
  }

  render = () => {
    return (
      <View style = { styles.parent }>
        <Text style = { styles.welcome }>
          Type something in English:
        </Text>
        <TextInput
          text = { this.state.input }
          onChangeText = { this.setText }
          onSubmitEditing = { this.showMeaning }
        />
        <Text style = { styles.label }>
          Its German equivalent is:
        </Text>
        <Text style = { styles.word }>
          { this.state.translation }
        </Text>
      </View>
    );
  }
};

Dictionary.defaultProps = {
  dataSource: 'https://raw.githubusercontent.com/hathibelagal/German-English-JSON-Dictionary/master/english_german.json',
};

var styles = React.StyleSheet.create({
  parent: {
    padding: 16
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  word: {
    marginTop: 15,
    fontSize: 30,
    fontStyle: 'italic'
  }
});

AppRegistry.registerComponent('Dictionary', () => Dictionary);

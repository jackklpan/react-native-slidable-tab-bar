import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableHighlight,
	Animated,
	Dimensions
} from 'react-native';


class SlidableTabBar extends Component {
	constructor(props) {
    super(props);

		let deviceWidth = Dimensions.get('window').width;
    this.state = {
			selectedTopic: 0,
			containerWidth: deviceWidth
		};
		if(props.containerWidth) {
			this.state.containerWidth = props.containerWidth;
		}
  }

	selectTopic (index){
		this.setState({selectedTopic: index});
	}
	renderCenterView (thisView, index){
		if(this.state.selectedTopic === index){
			return (
				<View
        	key={thisView.props.title + '_' + index}
        	style={{width: this.state.containerWidth, }}>
        	{thisView}
				</View>
			);
		}
	}
	renderTabBarOption (props, index){
		let buttonStyle = props.buttonStyle ? props.buttonStyle : styles.buttonStyle;
		let buttonUnderlayColor = props.buttonUnderlayColor ? props.buttonUnderlayColor : 'white';

		let title = props.title ? props.title : index+1;
		let textNormalStyle = props.textNormalStyle ? props.textNormalStyle : styles.textNormalStyle;
		let textHighlightStyle = props.textHighlightStyle ? props.textHighlightStyle : styles.textHighlightStyle;

		let bottomLine = index==this.state.selectedTopic ? <View style={{height:1, width:this.state.containerWidth, backgroundColor: 'blue'}} /> : null;

		return(
			<TouchableHighlight
				key={'button_'+index}
				style={buttonStyle}
				onPress={() => this.selectTopic(index)}
				underlayColor={buttonUnderlayColor}
			>
				<Text
					style={index==this.state.selectedTopic ? textHighlightStyle : textNormalStyle}
				>
					{title}
				</Text>
			</TouchableHighlight>
		);
	}
	render () {
		return(
			<View style={{flex:1, width:this.state.containerWidth}}>

				{/*Tab Bar*/}
				<View style={{flexDirection:'row'}}>
					<ScrollView
						automaticallyAdjustContentInsets={false}
						horizontal={true}
						bounces={false}
						showsHorizontalScrollIndicator={false}
					>
						{this.props.children.map((child, i) => this.renderTabBarOption(child.props, i))}
					</ScrollView>
				</View>

				{/*Main Content*/}
				<View style={{flex:1}}>
					{this.props.children.map((child, i) => this.renderCenterView(child, i))}
				</View>

			</View>
		);
	}
}

var styles = StyleSheet.create({
	buttonStyle: {
		justifyContent: 'center',
		width: 100,
		paddingBottom:14,
		paddingTop:12,
	},
	textNormalStyle: {
		color: 'black',
		fontSize: 17
	},
	textHighlightStyle: {
		color: 'blue',
		fontSize: 17
	}
});

module.exports = SlidableTabBar

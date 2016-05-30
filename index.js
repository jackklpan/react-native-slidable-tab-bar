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
			containerWidth: deviceWidth,
			tabBarWidth: deviceWidth / 4
		};
		if(props.containerWidth) {
			this.state.containerWidth = props.containerWidth;
		}
		if(this.props.children.length < 4) {
			this.state.tabBarWidth = this.state.containerWidth / this.props.children.length;
		} else {
			this.state.tabBarWidth = this.state.containerWidth / 4;
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
				style={[buttonStyle, {width: this.state.tabBarWidth}]}
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
		paddingBottom:14,
		paddingTop:12,
	},
	textNormalStyle: {
		textAlign: 'center',
		color: 'black',
		fontSize: 17
	},
	textHighlightStyle: {
		textAlign: 'center',
		color: '#ef783d',
		fontSize: 17
	}
});

module.exports = SlidableTabBar

import React from 'react';
import IconStar from '../Icons/IconStar';
import { View } from 'react-native';
import Button from '../Button/Button';

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || 0,
      totalStars: 5
    };

    this.selectStar = this.selectStar.bind(this);
    this.renderStars = this.renderStars.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.selected !== state.selected){
      return {
        ...state,
        selected: props.selected
      }
    }

    return state;
  };

  selectStar(i) {
    const { getRating } = this.props;

    // send to parent
    if (getRating) {
      getRating(i);
    }

    this.setState({
      selected: i,
    });
  }

  renderStars() {
    const stars = [];
    const { disabled } = this.props;
    const { selected, totalStars } = this.state;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <Button
          transparent
          disabled={disabled}
          onPress={() => this.selectStar(i)}
          style={{ marginHorizontal: 3, paddingVertical: 0, paddingHorizontal: 0, opacity: 1 }}
          key={i}
        >
          <IconStar isFill={i <= selected} size={16} />
        </Button>
      );
    }

    return stars;
  }

  render() {
    const { styleWrapper } = this.props;

    return <View style={[{ flexDirection: 'row' }, styleWrapper]}>{this.renderStars()}</View>;
  }
}

export default Rating;

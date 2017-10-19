import React, { Component, Children } from 'react';

export default class VictimSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // initialize slider with a victim that has an image
      currentIndex: 0
    };
  }

  componentWillMount () {
    const { initialIndex } = this.props;
    this.setState({
        currentIndex: initialIndex
    });
  }

  slide (dir) {
    let { currentIndex } = this.state;
    const { data } = this.props;
    currentIndex = this.normalizeIndex(currentIndex + dir, data.length);
    this.setState({ currentIndex });
  }

  normalizeIndex (index, length) {
    return index >= 0? index % length : length + index;
  }

  getVisibleIndices (centerIndex, visibleCount, totalLength) {
    const minIndex = - Math.floor(visibleCount/ 2);
    const rawIndices = [];
    for (let i = 0; i < visibleCount; ++i) {
      rawIndices.push(centerIndex + minIndex + i);
    }
    return rawIndices.map(i => this.normalizeIndex(i, totalLength));
  }

  getVisibleItems (data, currentIndex, visibleCount) {
    if (!data.length) return [];
    const visibleIndices = this.getVisibleIndices(currentIndex, visibleCount, data.length);
    const visibleItems = visibleIndices.map(i => data[i]);
    return visibleItems;
  }

  renderItems (data) {
    return Children.map(this.props.children, child => {
        return React.cloneElement(child, { data })
    });
  }

  render () {
    const { data, visibleCount, title } = this.props;
    const { currentIndex } = this.state;
    const items = this.getVisibleItems(data, currentIndex, visibleCount);
    return (
      <div>
        <h2>
        <span>{ title }</span>
          <div>
            <i className="slider-btn fa fa-angle-left" 
              onClick={() => this.slide(-1)}></i>
            <i className="slider-btn fa fa-angle-right" 
              onClick={() => this.slide(1)}></i>
          </div>
        </h2>
        { this.renderItems(items) }
      </div>
    );
  }

}
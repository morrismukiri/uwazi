import React from 'react';
import { shallow } from 'enzyme';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';

import Map from '../Map';

describe('Map', () => {
  let component;
  let props;
  let markers;
  beforeEach(() => {
    props = {
      onClick: jasmine.createSpy('onClick'),
      clickOnMarker: jasmine.createSpy('clickOnMarker'),
      latitude: 103,
      longitude: -63,
      zoom: 8,
      markers: [{ latitude: 2, longitude: 32, info: 'Some info' }, { latitude: 23, longitude: 21 }]

    };
  });

  const render = () => {
    component = shallow(<Map {...props} />);
    markers = component.find(Marker);
  };

  const firstMarker = () => markers.first();
  const secondMarker = () => markers.last();

  describe('render', () => {
    beforeEach(render);
    it('should render a ReactMapGL with the props', () => {
      const reactMap = component.find(ReactMapGL);
      expect(reactMap.props().latitude).toBe(103);
      expect(reactMap.props().longitude).toBe(-63);
      expect(reactMap.props().onClick).toBe(props.onClick);
    });

    it('should render a NavigationControl', () => {
      const controls = component.find(NavigationControl);
      expect(controls.length).toBe(1);
    });

    it('should render one Marker for each marker in props', () => {
      expect(markers.length).toBe(2);
      expect(firstMarker().props().latitude).toBe(2);
      expect(firstMarker().find('i').hasClass('map-marker')).toBe(true);
      expect(firstMarker().props().longitude).toBe(32);

      expect(secondMarker().props().latitude).toBe(23);
      expect(secondMarker().props().longitude).toBe(21);
    });

    it('should use custom renderMarker method', () => {
      props.renderMarker = (marker, onClick) => (<div className="custom-class" onClick={onClick}/>);
      render();
      expect(firstMarker().find('div').hasClass('custom-class')).toBe(true);
    });
  });

  describe('when map moves', () => {
    it('should update it throught viewport change', () => {
      render();
      const newViewport = {
        latitude: 1,
        longitude: 2,
        width: 100,
        height: 100,
        zoom: 7,
      };
      component.instance()._onViewportChange(newViewport);
      expect(component.state().viewport).toBe(newViewport);
    });
  });

  describe('setSize()', () => {
    it('should adapt the map size to the container', () => {
      render();
      component.instance().container = { style: {}, offsetWidth: 400, childNodes: [{ style: {} }] };
      component.instance().setSize();
      expect(component.state().viewport.width).toBe(400);
      expect(component.state().viewport.height).toBe(240);
    });

    describe('when the width is too tight', () => {
      it('should give at least 240px', () => {
        component.instance().container = { style: {}, offsetWidth: 50, childNodes: [{ style: {} }] };
        component.instance().setSize();
        expect(component.state().viewport.width).toBe(240);
        expect(component.state().viewport.height).toBe(144);
      });
    });
  });

  describe('event listeners', () => {
    it('should add and remove event listeners for resize', () => {
      spyOn(window, 'addEventListener');
      spyOn(window, 'removeEventListener');
      render();
      expect(window.addEventListener).toHaveBeenCalledWith('resize', component.instance().setSize);
      component.instance().componentWillUnmount();
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', component.instance().setSize);
    });
  });

  describe('clicking on a marker', () => {
    let popup;
    beforeEach(() => {
      render();
      firstMarker().find('i').first().simulate('click');
      component.update();
      popup = component.find(Popup);
    });

    it('should render a popup with the info', () => {
      expect(popup.length).toBe(1);
    });

    it('should not render a popup when has no info', () => {
      secondMarker().find('i').first().simulate('click');
      component.update();
      popup = component.find(Popup);
      expect(popup.length).toBe(0);
    });

    it('should call clickOnMarker', () => {
      expect(props.clickOnMarker).toHaveBeenCalledWith(props.markers[0]);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should update the viewport with the markers, latitude and longitude', () => {
      render();
      const instance = component.instance();
      instance.componentWillReceiveProps({ latitude: 73, longitude: 23, markers: [] });
      component.update();
      const { viewport } = component.state();
      expect(viewport.latitude).toBe(73);
      expect(viewport.longitude).toBe(23);
      expect(viewport.markers).toEqual([]);
    });
  });
});

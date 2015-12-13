import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Link } from 'react-router'

import Login from '../Login.js'
import {events} from '../../../utils/index'

import backend from 'fetch-mock'


describe('Login', () => {

  let component, fetch_mock;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Login/>);

    backend.restore();
    backend.mock('http://localhost:3000/api/login', JSON.stringify({}));
  });

  describe('on instance', () => {
    it('should set state with blank username and password', () => {
      expect(component.state.credentials).toEqual({username:'', password:''});
    });

    it('should set state with error false', () => {
      expect(component.state.error).toEqual(false);
    });
  });

  describe('render', () => {

    describe('when there is NOT an error', () => {
      it('should NOT display an error message', () => {
        expect(ReactDOM.findDOMNode(component).textContent).not.toMatch('Invalid password or username');
      });
    });

    describe('when there is an error', () => {
      it('should display an error message', () => {
        component.setState({error: true});
        expect(ReactDOM.findDOMNode(component).textContent).toMatch('Invalid password or username');
      });
    });
  });

  describe('submit()', () => {
    it('should POST to /api/login with username and password', (done) => {
      component.setState({credentials:{username:'bruce wayne', password:'im batman!'}})

      component.submit(new Event('submit'))
      .then(() => {
        expect(backend.calls().matched[0][1].body).toBe(JSON.stringify(component.state.credentials));
        done();
      })
      .catch(done.fail);

    });

    describe('on response success', () => {
      it('should set error false', (done) => {
        component.state.error = true;

        component.submit(new Event('submit'))
        .then(() => {
          expect(component.state.error).toBe(false);
          done();
        })
        .catch(done.fail);
      });

      it('should emit login event on success', (done) => {
        let event_emitted = false;
        events.on('login', () => {event_emitted = true})

        component.submit(new Event('submit'))
        .then(() => {
          expect(event_emitted).toBe(true);
          done();
        })
        .catch(done.fail);
      });
    });

    describe('on response failure', () => {

      it('should set error true', (done) => {
        backend.reMock('http://localhost:3000/api/login', {body: JSON.stringify({}), status: 401});

        component.submit(new Event('submit'))
        .then(() => {
          expect(component.state.error).toBe(true);
          done();
        })
        .catch(done.fail);
      });
    });

  });

});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import logo from 'images/logo.svg';
import './App.css';

import Login from 'lib/containers/Login.js';
import MarkdownSynapse from 'lib/containers/MarkdownSynapse.js';
import UserFavorites from 'lib/containers/UserFavorites.js';
import UserProjects from 'lib/containers/UserProjects.js';
import UserTeam from 'lib/containers/UserTeams.js';
import UserProfile from 'lib/containers/UserProfile.js';
import CustomMarkdownView from 'lib/containers/CustomMarkdownView';

import * as SynapseClient from 'lib/utils/SynapseClient.js';
import * as SynapseConstants from 'lib/utils/SynapseConstants.js';

import QueryWrapper from 'lib/containers/QueryWrapper';
import { Facets } from 'lib/containers/Facets';
import StackedRowHomebrew from 'lib/containers/StackedRowHomebrew';
import SynapseTable from 'lib/containers/SynapseTable';

import SynapseRow from 'lib/containers/SynapseRow';

/**
 * Demo of features that can be used from src/demo/utils/SynapseClient
 * module
 */

var App = function (_Component) {
  _inherits(App, _Component);

  /**
   * Maintain internal state of user session
   */
  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      token: "",
      ownerId: "",
      isLoading: true,
      showMarkdown: true
    };
    _this.makeSampleQueryCall = _this.makeSampleQueryCall.bind(_this);
    _this.getVersion = _this.getVersion.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.removeHandler = _this.removeHandler.bind(_this);
    return _this;
  }

  /**
   * Get the current version of Synapse
   */


  _createClass(App, [{
    key: 'getVersion',
    value: function getVersion() {
      var _this2 = this;

      // IMPORTANT: Your component should have a property (with default) to change the endpoint.  This is necessary for Synapse.org integration.
      // Pass your endpoint through to the rpc call:
      // SynapseClient.getVersion('https://repo-staging.prod.sagebase.org')
      SynapseClient.getVersion().then(function (data) {
        return _this2.setState(data);
      }).catch(function (error) {
        // Handle HTTPError.  Has statusCode and message.
        console.error("Get version failed", error);
      });
    }

    /**
     * Make a query on synapse
     */

  }, {
    key: 'makeSampleQueryCall',
    value: function makeSampleQueryCall() {
      // Example table (view) query.
      // See https://docs.synapse.org/rest/POST/entity/id/table/query/async/start.html
      var QUERY = {
        entityId: "syn12335586",
        query: {
          sql: "SELECT * FROM syn12335586",
          includeEntityEtag: true,
          isConsistent: false,
          offset: 0,
          limit: 100
        },
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
      };
      SynapseClient.getQueryTableResults(QUERY).then(function (data) {
        return console.log(data);
      }).catch(function (error) {
        console.error(error);
      });
    }

    /**
     * Update internal state
     * @param {Object} updatedState new state to be updated by the component
     */

  }, {
    key: 'handleChange',
    value: function handleChange(updatedState) {
      this.setState(updatedState);
    }
  }, {
    key: 'getMultipleWikis',
    value: function getMultipleWikis() {
      var _this3 = this;

      if (!this.state.token) {
        return "";
      }
      var foo = Array.from(Array(4).keys());
      return foo.map(function (element, index) {
        return React.createElement(
          'div',
          { className: 'container', key: index },
          React.createElement(MarkdownSynapse, { token: _this3.state.token,
            ownerId: "syn14568473",
            wikiId: "582406"
          })
        );
      });
    }
  }, {
    key: 'removeHandler',
    value: function removeHandler() {
      this.setState({ showMarkdown: !this.state.showMarkdown });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var token = process.env.REACT_APP_DEV_TOKEN;
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'div',
          { className: 'App-header text-center' },
          React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
          React.createElement(
            'h4',
            { className: 'white-text' },
            'Synapse React Client Demo'
          )
        ),
        React.createElement(
          'p',
          { className: 'App-intro text-center' },
          'Synapse production version: ',
          this.state.version
        ),
        React.createElement(Login, { onTokenChange: this.handleChange,
          token: this.state.token,
          theme: "light",
          icon: true,
          buttonText: "Sign in with Google",
          authProvider: "GOOGLE_OAUTH_2_0",
          redirectURL: "http://localhost:3000/"
        }),
        React.createElement(UserFavorites, { token: this.state.token,
          getUserFavoritesEndpoint: SynapseClient.getUserFavorites }),
        React.createElement(UserProjects, { token: this.state.token,
          getUserProjectsEndpoint: SynapseClient.getUserProjectList }),
        React.createElement(UserProfile, { onProfileChange: this.handleChange,
          token: this.state.token,
          ownerId: this.state.ownerId,
          getUserProfileEndpoint: SynapseClient.getUserProfile }),
        React.createElement(UserTeam, { token: this.state.token,
          ownerId: this.state.ownerId,
          getUserTeamEndpoint: SynapseClient.getUserTeamList }),
        this.state.isLoading ? React.createElement(
          'div',
          { className: 'container' },
          ' Loading markdown.. '
        ) : "",
        React.createElement(
          'div',
          { className: 'container SRC-syn-border-spacing' },
          React.createElement(
            'button',
            { className: 'btn btn-primary',
              onClick: function onClick() {
                _this4.removeHandler();
              } },
            ' Toggle markdown from view'
          )
        ),
        React.createElement(
          CustomMarkdownView,
          null,
          React.createElement(MarkdownSynapse, { removeHandler: this.removeHandler, token: token,
            ownerId: "syn14568473",
            wikiId: "582406",
            updateLoadState: this.handleChange
          })
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn15661198',
                limit: 25,
                offset: 0,
                selectedFacets: [],
                sort: []
              }
            },
            synapseId: 'syn15661198',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(Facets, null),
          React.createElement(StackedRowHomebrew, null),
          React.createElement(SynapseTable, null)
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn16787123',
                limit: 3,
                offset: 0
              }
            },
            synapseId: 'syn16787123',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(SynapseRow, {
            type: SynapseConstants.STUDY
          })
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn16859580',
                limit: 7,
                offset: 0
              }
            },
            synapseId: 'syn16859580',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(SynapseRow, {
            type: SynapseConstants.DATASET
          })
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn16859448',
                limit: 7,
                offset: 0
              }
            },
            synapseId: 'syn16859448',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(SynapseRow, { type: SynapseConstants.TOOL })
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn16857542',
                limit: 7,
                offset: 0
              }
            },
            synapseId: 'syn16857542',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(SynapseRow, { type: SynapseConstants.PUBLICATION })
        ),
        React.createElement(
          QueryWrapper,
          {
            initQueryRequest: {
              concreteType: "org.sagebionetworks.repo.model.table.QueryBundleRequest",
              partMask: SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS | SynapseConstants.BUNDLE_MASK_QUERY_FACETS | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
              query: {
                isConsistent: false,
                sql: 'SELECT * FROM syn16858699',
                limit: 25,
                offset: 0
              }
            },
            synapseId: 'syn16858699',
            token: token,
            alias: 'Disease',
            filter: 'parentId',
            defaultVisibleCount: 4 },
          React.createElement(SynapseRow, { type: SynapseConstants.FUNDER })
        )
      );
    }
  }]);

  return App;
}(Component);

export default App;
import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import QueryWrapperMenuDemo from './QueryWrapperMenuDemo'
import CardContainerLogicDemo from './CardContainerLogicDemo'
import SearchDemo from './SearchDemo'
import ModalDownloadDemo from './ModalDownloadDemo'
import UserCardDemo from './UserCardDemo'
import MarkdownSynapseDemo from './MarkdownSynapseDemo'
import { NewsFeedDemo } from './NewsFeedDemo'
import FormServicesIntegrationDemo from './FormServicesIntegrationDemo'
import QueryWrapperPlotNavDemo from './QueryWrapperPlotNavDemo'
import { DownloadListTableDemo } from './DownloadListTableDemo'
import { WidgetDemo } from './WidgetDemo'
import { RouteChildrenProps } from 'react-router'
import { AccessRequirementDemo } from './AccessRequirementDemo'
import TemplateComponentDemo from './TemplateComponentDemo'

/**
 * Demo of features that can be used from src/demo/utils/SynapseClient
 * module
 */
const App = ({
  match,
  token,
}: {
  match?: RouteChildrenProps['match']
  token: string
}) => {
  if (!match) {
    return <div />
  }
  return (
    <div>
      <h2>Links to components under development </h2>
      <ul>
        <li>
          <Link to={`${match.url}/QueryWrapperMenuDemo`}>
            QueryWrapperMenuDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/QueryWrapperPlotNavDemo`}>
            QueryWrapperPlotNavDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/SearchDemo`}>SearchDemo</Link>
        </li>
        <li>
          <Link to={`${match.url}/CardContainerLogicDemo`}>
            CardContainerLogicDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/UserBadgeDemo`}>UserBadgeDemo</Link>
        </li>
        <li>
          <Link to={`${match.url}/MarkdownSynapseDemo`}>
            MarkdownSynapseDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/NewsFeedDemo`}>NewsFeedDemo</Link>
        </li>
        <li>
          <Link to={`${match.url}/FormServicesIntegrationDemo`}>
            FormServicesIntegrationDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/ModalDownloadDemo`}>ModalDownload</Link>
        </li>
        <li>
          <Link to={`${match.url}/DownloadListTableDemo`}>
            DownloadListTableDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/WidgetDemo`}>WidgetDemo</Link>
        </li>
        <li>
          <Link to={`${match.url}/AccessRequirementDemo`}>
            AccessRequirementDemo
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/TemplateComponentDemo`}>
            TemplateComponentDemo
          </Link>
        </li>
      </ul>

      <Route
        exact={true}
        path={`${match.url}/QueryWrapperMenuDemo`}
        render={() => <QueryWrapperMenuDemo rgbIndex={0} />}
      />

      <Route
        exact={true}
        path={`${match.url}/QueryWrapperPlotNavDemo`}
        render={() => <QueryWrapperPlotNavDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/SearchDemo`}
        render={() => <SearchDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/CardContainerLogicDemo`}
        component={CardContainerLogicDemo}
      />

      <Route
        exact={true}
        path={`${match.url}/UserBadgeDemo`}
        component={() => <UserCardDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/MarkdownSynapseDemo`}
        component={() => <MarkdownSynapseDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/NewsFeedDemo`}
        component={() => <NewsFeedDemo />}
      />
      <Route
        exact={true}
        path={`${match.url}/FormServicesIntegrationDemo`}
        component={() => <FormServicesIntegrationDemo />}
      />
      <Route
        exact={true}
        path={`${match.url}/ModalDownloadDemo`}
        component={() => <ModalDownloadDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/DownloadListTableDemo`}
        component={() => <DownloadListTableDemo token={token} />}
      />

      <Route
        exact={true}
        path={`${match.url}/WidgetDemo`}
        component={() => <WidgetDemo />}
      />

      <Route
        exact={true}
        path={`${match.url}/AccessRequirementDemo`}
        component={() => <AccessRequirementDemo token={token} />}
      />

      <Route
        exact={true}
        path={`${match.url}/TemplateComponentDemo`}
        component={() => <TemplateComponentDemo />}
      />

      <Route exact={true} path={match.path} component={() => <div />} />
    </div>
  )
}

export default App

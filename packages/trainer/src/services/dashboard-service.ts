import m, { ComponentTypes, RouteDefs } from 'mithril';
import { AboutPage } from '../components/about/about-page';
import { HelpPage } from '../components/about/help-page';
import { EditForm } from '../components/edit/edit-form';
import { EventsList } from '../components/home/form-list';
import { HomePage } from '../components/home/home-page';
import { Layout } from '../components/layout';
import { PlayPage } from '../components/play/play-page';
import { FormView } from '../components/show/form-view';
import { IDashboard } from '../models/dashboard';
import { actions, states } from './';

export const enum Dashboards {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  HELP = 'HELP',
  READ = 'SHOW',
  EDIT = 'EDIT',
  PLAY = 'PLAY',
  SEARCH = 'SEARCH',
  USER = 'USER',
}

class DashboardService {
  private actions = actions;
  private states = states;
  private dashboards!: ReadonlyArray<IDashboard>;

  constructor(private layout: ComponentTypes, dashboards: IDashboard[]) {
    this.setList(dashboards);
  }

  public getList() {
    return this.dashboards;
  }

  public setList(list: IDashboard[]) {
    this.dashboards = Object.freeze(list);
  }

  public get defaultRoute() {
    const dashboard = this.dashboards.filter(d => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }

  public route(dashboardId: Dashboards) {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    return dashboard ? dashboard.route : this.defaultRoute;
  }

  public switchTo(dashboardId: Dashboards, params?: { [key: string]: string | number | undefined }) {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    if (dashboard) {
      m.route.set(dashboard.route, params ? params : undefined);
    }
  }

  public routingTable() {
    return this.dashboards.reduce(
      (p, c) => {
        p[c.route] = c.hasNavBar === false
          ? { render: () => m(c.component, { state: this.states(), actions: this.actions }) }
          : { render: () => m(this.layout, m(c.component, { state: this.states(), actions: this.actions })) };
        return p;
      },
      {} as RouteDefs,
    );
  }
}

export const dashboardSvc: DashboardService = new DashboardService(Layout, [
  {
    id: Dashboards.SEARCH,
    title: 'SEARCH',
    icon: 'home',
    route: '/search',
    visible: true,
    component: EventsList,
  },
  {
    id: Dashboards.READ,
    title: 'READ',
    icon: 'description',
    route: '/read/:id',
    visible: false,
    component: FormView,
  },
  {
    id: Dashboards.EDIT,
    title: 'EDIT',
    icon: 'edit',
    route: '/edit/:id',
    visible: false,
    component: EditForm,
  },
  {
    id: Dashboards.PLAY,
    title: 'PLAY',
    icon: 'play_arrow',
    route: '/play/:id/:sid',
    visible: false,
    component: PlayPage,
  },
  {
    id: Dashboards.HELP,
    title: 'HELP',
    icon: 'info',
    route: '/help',
    visible: true,
    component: HelpPage,
  },
  {
    id: Dashboards.ABOUT,
    title: 'ABOUT',
    icon: 'help',
    route: '/over',
    visible: true,
    component: AboutPage,
  },
  {
    id: Dashboards.HOME,
    default: true,
    hasNavBar: false,
    title: 'HOME',
    route: '/',
    visible: false,
    component: HomePage,
  },
]);

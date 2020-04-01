import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/program",
    title: "Programs",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/findomain",
    title: "Findomain",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/linkfinder",
    title: "LinkFinder",
    icon: "icon-bullet-list-67",
    class: ""
  },
  {
    path: "/arjun",
    title: "Arjun",
    icon: "icon-app",
    class: ""
  },
  {
    path: "/dirsearch",
    title: "Dirsearch",
    icon: "icon-attach-87",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}

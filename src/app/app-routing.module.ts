import { SettingsClientsModule } from './components/settings-clients/settings-clients.module';
import { CityModule } from './components/cities/city.module';
import { CountryModule } from './components/countries/country.module';

import { countryRoutingModule } from './components/countries/country-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CategoryModule } from './components/categories/category.module';
import { ServicesModule } from './components/services/services.module';
import { ReportsModule } from './components/reports/reports.module';
import { SubCategoryModule } from './components/sub-categories/sub-category.module';
import { SettingsOrdersParcelsModule } from './components/settings-orders-parcels/settings-orders-parcels.module';
// import { CityRoutingModule } from './components/cities/city-routing.module';
// import { FilterModule } from './components/filter/filter.module';
// import { TagsModule } from './components/tags/tags.module';
// import { ShopsModule } from './components/shops/shops.module';
// import { DeliveryCompaniesModule } from './components/delivery-companies/delivery-companies.module';
// import { VouchersModule } from './components/vouchers/vouchers.module';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'auth/login',component:LoginComponent},
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      // {path:'',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
      {path:'home',component:HomeComponent, data: { title: 'تقارير الشركة' }},
      // {path:'profile',component:ProfileComponent, data: { title: 'بيانات الشركة' }},
    ]
  },
  {
    path: 'app',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: 'categories', loadChildren: () => CategoryModule },
      { path: 'sub-categories', loadChildren: () => SubCategoryModule },
      { path: 'country', loadChildren: () => CountryModule },
      { path: 'city', loadChildren: () => CityModule },
      { path: 'services', loadChildren: () => ServicesModule },
      { path: 'settings-orders', loadChildren: () => SettingsOrdersParcelsModule },
      { path: 'settings-clients', loadChildren: () => SettingsClientsModule },
      // { path: 'filter', loadChildren: () => FilterModule },
      // { path: 'tags', loadChildren: () => TagsModule },
      // { path: 'shops', loadChildren: () => ShopsModule },
      // { path: 'delivery-companies', loadChildren: () => DeliveryCompaniesModule },
      // { path: 'vouchers', loadChildren: () => VouchersModule },
      {path:'reports',loadChildren:()=>ReportsModule},
    ]
  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public location: any = [];
  private locationSource = new  BehaviorSubject(this.location);
  private currentLocation = this.locationSource.asObservable();

  constructor(private http:HttpClient) {
    this.locationSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('location')));
  }

  // Category

  // allCategories(){
  //   return this.http.get(`${environment.endpoint}/shop/categories/all`);
  // }
  // allCategoriesDeliveryServices() {
  //   return this.http.get(`${environment.endpoint}/user/categories/all?type=2`);
  // }
  // addCategory(category){
  //   return this.http.post(`${environment.endpoint}/shop/category/add`, category);
  // }
  // deleteCategory(category_id){
  //   return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`);
  // }
///////////////////Start From : Country //////////////////
allCountries(){
  return this.http.get(`${environment.endpoint}/user/countries/all`);
}

addCountry(country){
  return this.http.post(`${environment.endpoint}/admin/country/create`, country);
}
 
editCountry(country){
return this.http.post(`${environment.endpoint}/admin/country/edit` , country);
}

deleteCountry(country_id) {
  return this.http.delete(`${environment.endpoint}/admin/country/delete?country_id=${country_id}`) ;
}
/////////////////////City///////////////////////////

getCityByCountryId(country_id) {
  return this.http.get(`${environment.endpoint}/user/cities/all?country_id=${country_id}`);
}

addCity(city) {
  return this.http.post(`${environment.endpoint}/admin/city/create` , city) ;
}

editCity(city){
  return this.http.post(`${environment.endpoint}/admin/city/edit` , city);
}
deleteCity(city_id){
 return this.http.delete(`${environment.endpoint}/admin/city/delete?city_id=${city_id}`);
}

//////////////////////Category//////////////////////////
allUserCategory(type){
return this.http.get(`${environment.endpoint}/user/categories/all?type=${type}`)
}
addAdminCategory(category){
  return this.http.post(`${environment.endpoint}/admin/category/create`,category) ; 
}

editAdminCategory(category){
  return this.http.post(`${environment.endpoint}/admin/category/edit`,category) ; 
}
deleteAdminCategory(category_id){
  return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`) ; 
}
/////////////////////SubCategory///////////////////////////

allUserSubCategory(category_id){
  return this.http.get(`${environment.endpoint}/user/subcategories/all?category_ids[0]=${category_id}`)
}
addAdminSubCategory(subCategory){
 return this.http.post(`${environment.endpoint}/admin/subcategory/create`,subCategory)
}
editAdminSubCategory(subCategory){
return this.http.post(`${environment.endpoint}/admin/subcategory/edit`,subCategory)
}

deleteAdminSubCategory(subCategory_id) {
return this.http.delete(`${environment.endpoint}/admin/subcategory/delete?subcategory_id=${subCategory_id}`)
}
/////////////////////Services///////////////////////////

allServices(){
  return this.http.get(`${environment.endpoint}/user/services/all`) ;
}

addService(service){
  return this.http.post(`${environment.endpoint}/admin/service/create`,service) ; 
}

editService(service) {
  return this.http.post(`${environment.endpoint}/admin/service/edit`,service) ; 
}
deleteService(service_id) {
  return this.http.delete(`${environment.endpoint}/admin/service/delete?service_id=${service_id}`)
}


////////////////////// End //////////////////////////

  uploadImage(f){
    return this.http.post(`${environment.endpoint}/user/files/add`, f);
  }
  
  addFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/create`, filterObj); }
  editFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/edit`, filterObj); }
  appendFilterShop(filterShopObj) { return this.http.post(`${environment.endpoint}/admin/filter/append`, filterShopObj); }
  deleteFilter(filter_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/filter/delete?filter_id=${filter_id_Obj}`); }
  listFilters() { return this.http.get(`${environment.endpoint}/filters/all`); }
  
  // Tags Requests
  addTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/create`, tagObj); }
  editTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/edit`, tagObj); }
  appendTagShop(tagShopObj) { return this.http.post(`${environment.endpoint}/admin/hometag/append`, tagShopObj); }
  removeTagShop(tagShopObj) { return this.http.post(`${environment.endpoint}/admin/hometag/remove`, tagShopObj); }
  deleteTag(tag_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/hometag/delete?home_tag_id=${tag_id_Obj}`); }
  listTags() { return this.http.get(`${environment.endpoint}/user/hometags/all`); }
  
  // Shops Requests
  addShop(shopObj) {
    const formData = new FormData();
    for( let key in shopObj ) {
      if( key == 'shop_categories' ) {
        for( let c = 0; c < shopObj['shop_categories'].length; c++ ) {
          formData.append('shop_categories['+c+']', shopObj['shop_categories'][c].id);
        }
      } else if( key == 'shop_subcategories' ) {
        for( let c = 0; c < shopObj['shop_subcategories'].length; c++ ) {
          formData.append('shop_subcategories['+c+']', shopObj['shop_subcategories'][c].id);
        }
      } else {
        formData.append(key, shopObj[key]);
      }
    }
    return this.http.post(`${environment.endpoint}/admin/shop/register`, formData);
  }
  deleteShop(shop_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/shop/delete?shop_id=${shop_id_Obj}`); }
  listShops() { return this.http.get(`${environment.endpoint}/admin/shops/all`); }
  
  // Categories
  listCategories() { return this.http.get(`${environment.endpoint}/user/categories/all?type=${1}`); }
  listSubCategories(category_id) { return this.http.get(`${environment.endpoint}/user/subcategories/all?category_ids[0]=${category_id}`); }

  // Delivery Companies Requests
  addDeliveryCompany(Company_obj) { return this.http.post(`${environment.endpoint}/admin/delivery/company/register`, Company_obj); }
  deleteDeliveryCompanies(id) { return this.http.delete(`${environment.endpoint}/admin/delivery/company/delete?delivery_company_id=${id}`); }
  listDeliveryCompanies() { return this.http.get(`${environment.endpoint}/admin/delivery/company/all`); }

  // Vouchers
  addVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/create`, voucher_obj); }
  editVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/edit`, voucher_obj); }
  deleteVoucher(id) { return this.http.delete(`${environment.endpoint}/admin/voucher/delete?voucher_id=${id}`); }
  listVouchers() { return this.http.get(`${environment.endpoint}/admin/vouchers/all`); }

  // Settings Orders Parcels Requests
  listOrders(status_id: number) {
    // return this.http.get(`${environment.endpoint}/admin/orders/all?status_id=${status_id}&service_type=2`);
    return this.http.get(`${environment.endpoint}/admin/orders/all?service_type=${1}&status_id=${status_id}`);
  }

  // Settings Users Requests
  listUsers(status_id: number, type: number) {
    return this.http.get(`${environment.endpoint}/admin/users/all?status_id=${status_id}&type=${type}`);
  }
  manageUsers(user_id: number, status_id: number) {
    return this.http.get(`${environment.endpoint}/admin/account/activate?user_id=${user_id}&status_id=${status_id}`);
  }
}


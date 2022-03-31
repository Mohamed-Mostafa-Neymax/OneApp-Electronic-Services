import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $,jQuery:any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      // left sidebar and vertical menu
      if ($('#pageWrapper').hasClass('compact-wrapper')) {
        jQuery('.sidebar-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
        jQuery('.sidebar-title').click(function () {
            jQuery('.sidebar-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.sidebar-submenu, .menu-content').slideUp('normal');
            jQuery('.menu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            }
        });
        jQuery('.sidebar-submenu, .menu-content').hide();
        jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
        jQuery('.submenu-title').click(function () {
            jQuery('.submenu-title').removeClass('active').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.submenu-content').slideUp('normal');
            if (jQuery(this).next().is(':hidden') == true) {
                jQuery(this).addClass('active');
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                jQuery(this).next().slideDown('normal');
            } else {
                jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            }
        });
        jQuery('.submenu-content').hide();
      } else if ($('#pageWrapper').hasClass('horizontal-wrapper')) {
        var contentwidth = jQuery(window).width();
        if ((contentwidth) < '992') {
            $('#pageWrapper').removeClass('horizontal-wrapper').addClass('compact-wrapper');
            $('.page-body-wrapper').removeClass('horizontal-menu').addClass('sidebar-icon');
            jQuery('.submenu-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.submenu-title').click(function () {
                jQuery('.submenu-title').removeClass('active');
                jQuery('.submenu-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                jQuery('.submenu-content').slideUp('normal');
                if (jQuery(this).next().is(':hidden') == true) {
                    jQuery(this).addClass('active');
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                    jQuery(this).next().slideDown('normal');
                } else {
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                }
            });
            jQuery('.submenu-content').hide();
  
            jQuery('.sidebar-title').append('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
            jQuery('.sidebar-title').click(function () {
                jQuery('.sidebar-title').removeClass('active');
                jQuery('.sidebar-title').find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                jQuery('.sidebar-submenu, .menu-content').slideUp('normal');
                if (jQuery(this).next().is(':hidden') == true) {
                    jQuery(this).addClass('active');
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-down"></i></div>');
                    jQuery(this).next().slideDown('normal');
                } else {
                    jQuery(this).find('div').replaceWith('<div class="according-menu"><i class="fa fa-angle-right"></i></div>');
                }
            });
            jQuery('.sidebar-submenu, .menu-content').hide();
        }
      }
  }

}

var Scity,Sdistrict,Sward;
$=jQuery.noConflict();
$(document).ready(function(){
    var params=Drupal.settings;
    var form = $('#bat-dong-san-node-form');  
    
    /*
    *
    * script for address info
    */
    var city=params.city;
    var district=params.district;
    var ward=params.ward;
    Scity=$('#bat-dong-san-node-form #edit-field-fcity-und');
    Sdistrict=$('#bat-dong-san-node-form #edit-field-fdistrict-und');
    Sward=$('#bat-dong-san-node-form #edit-field-fward-und');
    Scity.change(function(){
        reset_city_select();
        var cid=$(this).val();
        if(cid=='_none') return;
        for(i in district){
            if(district[i]['city_id']==cid){                
                $('option[value="'+i+'"]',Sdistrict).show();
            }
        }
        
    });
     Sdistrict.change(function(){
       reset_district_select();
        var did=$(this).val();
        if(did=='_none') return;
        for(i in ward){                
            if(ward[i]['district_id']==did){                
                $('option[value="'+i+'"]',Sward).show();
            }
        }
       
    });

function reset_city_select() {
    $('option:not(:first-child)',Sdistrict).hide();
    $('option:not(:first-child)',Sward).hide();
    Sdistrict.val('_none');
    Sward.val('_none');
}
function reset_district_select() {
    $('option:not(:first-child)',Sward).hide();
    Sward.val('_none');
}    
    
    
    /*
    * script for user choose type of lands
    */
  
  var hasActive=false;
  $('.term-reference-tree-level input').each(function(){
    if(!$(this).attr('id').match('children')){    
    if($(this).is(':checked')) $(this).closest('li').addClass('active');
    var hasActive=true;
    }
  });
  
  if(!hasActive) {
    $('.term-reference-tree > .term-reference-tree-level >li:first-child').addClass("active");
  }
  
  $('.term-reference-tree li:not(.active) .term-reference-tree-button',form).trigger('click');  
  var count=0;
  var tabs="";
  
  $('.term-reference-tree > .term-reference-tree-level >li',form).each(function(){
    count++;
    var active=$(this).hasClass('active')?'active':"";
    tabs+='<li class="header-tab '+active+'" id="tab_'+count+'">'+$('label',this).html()+'</li>';
    $('> .term-reference-tree-button',this).attr('id','target_tab_'+count);
    $('>.form-item',this).hide(0);
    
  });
  
  $('.term-reference-tree').prepend('<ul class="bds-type-tabs">'+tabs+'</ul>');
  
  $('.bds-type-tabs .header-tab').click(function(){
    var button= $('.term-reference-tree-button#target_'+$(this).attr('id'))
    if(button.closest('li').hasClass('active')) return;
    $('.bds-type-tabs .header-tab').removeClass('active');
    $(this).addClass('active');
    button.trigger('click');
  });
  
  $('.term-reference-tree-button',form).unbind('click').bind('click',function(){ 
    var  parent=$(this).closest('li');
  
    $('.term-reference-tree-button',parent.closest('.term-reference-tree-level')).addClass('term-reference-tree-collapsed');
    $(this).removeClass('term-reference-tree-collapsed');
    $('.term-reference-tree-button',parent).removeClass('term-reference-tree-collapsed');
    $('li',parent.closest('.term-reference-tree-level')).removeClass('active');
    parent.addClass('active');
    $('li',parent).addClass('active');
    
    $('li:not(.active) .term-reference-tree-level').slideUp();
    $('li.active >.term-reference-tree-level').slideDown();
    $('.term-reference-tree-level input').attr('checked',false).trigger('change');
    $('li.active >.term-reference-tree-level').attr('checked',true).trigger('change');
  }); 
  
  $('.term-reference-tree-level input',form).unbind('change').change(function() {
    if($(this).is(':checked')) {
      $('>li >.form-item >input',$(this).closest('.term-reference-tree-level')).not(this).attr('checked',false);
    }
   $('.term-reference-tree-level input',form).each(function() {
      label_set_icon($(this));  
   });
  
  check_parent($(this));
  
  }).trigger('change');

function check_parent(selector){
    var parent=selector.closest('.term-reference-tree-level');
    
    if(!selector.is(':checked')) return;    
    if(parseInt(parent.length)!=0){

      selector=$('>.form-item >input',parent.parent());
      selector.attr("checked",true);
      label_set_icon(selector);
      check_parent(selector);
    }
    
}
function label_set_icon(selector){
    $('label i',selector.parent()).remove();
    if(selector.is(':checked')) {
      $('label',selector.parent()).prepend('<i class="icon-ok"></i>');
     
    } else {
      $('label',selector.parent()).prepend('<i class="icon-none"></i>');
    }
    
}

  /*
  *
  * Script for field maps
  */
  
  var mapField=$('.field-name-field-map-form',form);
  mapField.before('<div class="set-view-map"><label for="user_can_view_map"> Bạn có muốn thêm bản đồ cho bất động sản này</label><input id="user_can_view_map" type="checkbox" value="false"></div>');
  $('#user_can_view_map',form).change(function() {
    if(!$(this).is(":checked")) {
      mapField.css({'visibility':'hidden',"position":'absolute','top':'-99999px'});
    } else {
      mapField.css({'visibility':'visible',"position":'static'});
    }
  $(window).trigger('resize');  
  }).trigger('change');
  

  
 
    
});

    

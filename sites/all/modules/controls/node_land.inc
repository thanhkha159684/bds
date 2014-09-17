<?php
function LandsFormAlter(&$form, &$form_state, $form_id){
     
    $form['#attached']['js'] = array(
      drupal_get_path('module', 'controls') . '/js/node_land.js',
    );
    $form['#attached']['css'] = array(
      drupal_get_path('module', 'controls') . '/css/node_land.css',
    );
    dsm($form);
 
     //get value
     $city=$form['field_fcity']['und']['#options'];
     $district = entity_load('node',FALSE,array('type'=>'district'));
     foreach($district as $key=>$item) {
        $Adist[$key]=array('city_id'=>$item->field_city['und'][0]['target_id'],
                            'name'=>$item->title,
        );
     }
     
     $ward = entity_load('node',FALSE,array('type'=>'ward'));
     foreach($ward as $key=>$item) {
        $Award[$key]=array('district_id'=>$item->field_district['und'][0]['target_id'],
                            'name'=>$item->title,
        );
     }
     
     $address = array(
     'city'=>$city,
     'district'=>$Adist,
     'ward'=>$Award,
     );
    drupal_add_js($address,'setting');
       
}

<?php

function SearchLandsFormAlter(&$form, &$form_state, $form_id){
     $form['#attached']['js'] = array(
      drupal_get_path('module', 'controls') . '/js/search_land.js',
    );
    $Btype=taxonomy_get_tree(1);
    foreach($Btype as $item){
        if($item->parents[0]==0) continue;
        $tids[$item->parents[0]][$item->tid]=$item->name;
    }
    $Bcity=entity_load('node',FALSE,array('type'=>'city'));
    $Bdistrict=entity_load('node',FALSE,array('type'=>'district'));
    foreach($Bdistrict as $dis){
    if(isset($dis->field_city['und'][0]['target_id'])){
    $cid=$dis->field_city['und'][0]['target_id'];    
    $location[$cid][$dis->nid]=array(
        'cname'=>$Bcity[$cid]->title,
        'dname'=>$dis->title,
        );
        }     
    }
    
    $Bproject=entity_load('node',FALSE,array('type'=>'project'));
    foreach($Bproject as $item){
    if(isset($item->field_fcity['und'][0]['target_id'])&&isset($item->field_fdistrict['und'][0]['target_id'])){
       
    $cid=$item->field_fcity['und'][0]['target_id'];
    $did=$item->field_fdistrict['und'][0]['target_id'];
    $project[$cid][$did]=array(
        'pname'=>$item->title,
        'pid'=>$item->nid,
        'cname'=>$Bcity[$cid]->title,
        'dname'=>$Bdistrict[$did]->title,
        );
        }     
    
        
    }
    $form['fwrap']=array(
    '#type'=>'fieldset',
    );
    $form['fwrap']['field_loai_bds_tid_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Loại bất dộng sản'),
    )
    );
   
    $form['fwrap']['field_fcity_target_id_1_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Lựa chọn tỉnh thành phố'),
    )
    );
    
    $form['fwrap']['field_fdistrict_target_id_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Lựa chọn quận huyện'),
    )
    );
    $form['fwrap']['field_price_value_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Lựa chọn giá'),
    )
    );
    $form['fwrap']['field_dien_tich_value_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Lựa chọn diện tích'),
    )
    );
    
    $form['fwrap']['field_project_target_id_input']=array(
    '#type'=>'textfield',
    '#attributes'=>array(
    'placeholder'=>t('Lựa chọn dự án'),
    )
    );
    $form['fwrap']['form_sumit']=array(
    '#type'=>'submit',
    '#value'=>'Tìm kiếm',
    );
    $form['#action']='http://google.com';   
    // dsm($form);
    drupal_add_library('system', 'ui.dialog');
    drupal_add_js(array(
    'tids'=>$tids,
    'locations'=>$location,
    'project'=>$project,
    ),'setting');
}


function SeachLandQueryAlter(&$view, &$query){
    $args=$view->args;    
    if(isset($view->whereargs['type']))
        $query->where[0]['conditions'][0]['value'][':field_data_field_loai_bds_field_loai_bds_tid']=$view->whereargs['type'];
    
    if(isset($view->whereargs['city']))
        $query->where[0]['conditions'][1]['value'][':field_data_field_fcity_field_fcity_target_id']=$view->whereargs['city'];

    foreach ($query->where[0]['conditions'] as $k=>$where){
    if($k>=(count($args)-1))    
    unset($query->where[0]['conditions'][$k]);
    }
    
    //filter by district base on field arrange !! carefully on rearrange field   
    if(isset($view->whereargs['district'])){        
        $query->where[1]['conditions'][2]['value']=$view->whereargs['district'];
    }
    else{
        unset($query->where[1]['conditions'][2]);    
    }
} 
function SearchLandPageCallback(&$view, &$display_id, &$args){

    if(isset($view->args[1]))
    {
     $Ptype=str_replace('-',' ',$view->args[0]);    
     $Ptype=db_query('SELECT t.tid, t.name
                    FROM {taxonomy_term_data} t                    
                    WHERE t.name LIKE :tname
                    ',array(':tname'=>db_like($Ptype) . '%'))->fetchAll();
    $Ptype=$Ptype[0]->tid;                                
    $Stype=str_replace('-',' ',$view->args[1]);  
    }else{
     $Stype=str_replace('-',' ',$view->args[0]);   
    }
    $type=db_select('taxonomy_term_data', 't');    
    
    if(isset($view->args[1])){
    $type->leftJoin('taxonomy_term_hierarchy','p','t.tid=p.tid');    
    $type->fields('p',array('parent'));    
    $type->condition('p.parent',$Ptype,'=');    
    }
    $type->fields('t',array('tid','name'));
    $type->condition('t.name',db_like($Stype) . '%','LIKE');
    $type=$type->execute()->fetchAll();
    $view->whereargs['type']=isset($type[0]->tid)?$type[0]->tid:'';
    
    
    //get city params from url
    if(isset($view->args[2])){ 
    $Scity=str_replace('-',' ',$view->args[2]);    
    $city=db_select('node', 'n');
    $city->fields('n',array('nid','title'));
    $city->condition('n.type','city','=');    
    $city->condition('n.title',db_like($Scity). '%','LIKE');
    $city=$city->execute()->fetchAll();
    $view->whereargs['city']=isset($city[0]->nid)?$city[0]->nid:'';
    }
    
    
    //get district from $_POST and save to session
    dsm($_POST);
    if(isset($_POST['field_fdistrict_target_id'])){
        $district=$_POST['field_fdistrict_target_id'];
        $view->whereargs['district']=$district; 
    }

}

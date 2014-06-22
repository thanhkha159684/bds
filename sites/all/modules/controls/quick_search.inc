<?php


function QuickSearhFormLandAlter(&$form,&$form_state, $form_id){
    
    $form['#attached']['js'] = array(
      drupal_get_path('module', 'controls') . '/js/quick_search.js',
    );
    $form['quick_search_submit']=array(
    '#type'=>'submit',
    '#value'=>t('Tìm kiếm'),
    '#attributes'=>array('name'=>""),
    );
 
    //dsm($form);
    
  

}
function  QuickSearchQueryAlter(&$view, &$query){
 
 if (isset($_GET['title']))
 {
    //dsm($_GET['title']);
    $query->where[1]['conditions'][2]['value']='%'.$_GET['title'].'%';
    /*
    $str=explode(' ',$_GET['title']);
    
    foreach($query->where[1]['conditions'] as $idx => $condition) {
      if (!is_object($condition['field']) && $condition['field'] == 'node.title') {
        //$query->where[1]['conditions'][$idx]['value'] = '%whateveryoulike%';
        // or you can unset this condition and write down a new one
         unset($query->where[1]['conditions'][$idx]);
         $like=array();
         foreach ($str as $arg){
            if ($arg=="") continue;
            $like[]='title LIKE "%'. db_like($arg).'%"';
         }
         $like=implode(' OR ',$like);
         dsm($like);            
         $query->add_where_expression('1',$like );
      }
    
    }
    */
    
    
    
        
 }

 //dpr($query->where[1]['conditions']); 
  
}
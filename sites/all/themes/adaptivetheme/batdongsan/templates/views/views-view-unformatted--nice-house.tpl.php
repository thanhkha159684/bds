<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php
$col_1="";
$col_2="";
$col_3="";

 foreach ($rows as $id => $row){ 
if ($id%3==0) $col_1.='<div class="'.@$classes_array[$id].'">'.$row.'</div>';
if ($id%3==1) $col_2.='<div class="'.@$classes_array[$id].'">'.$row.'</div>';
if ($id%3==2) $col_3.='<div class="'.@$classes_array[$id].'">'.$row.'</div>';    
}
 ?>
<div class="col col1"><?php print $col_1?></div>
<div class="col col2"><?php print $col_2?></div>
<div class="col col3"><?php print $col_3?></div>
<script>
jQuery(function($){
  var block = $('#block-views-nice-house-block');
  $('.col1 .views-field-title,.col3 .views-field-title',block).each(function(){
    $(this).clone().appendTo($(this).parent());
    $(this).remove();
  });
});
</script>
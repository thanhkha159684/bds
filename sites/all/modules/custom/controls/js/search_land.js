$=jQuery.noConflict();
var Sblock,Tabs;
var Active_tid;
var params=Drupal.settings;
Drupal.behaviors.booking = {
attach: function (context,settings) {
if(context==document||context[0]['id']=='views-exposed-form-search-land-block'){ 
search_view_header();
change_expose_form();
set_default_bds_type();
}
}
}




$(document).ready(function(){
        
     set_default_bds_type();
         
});
function submit_form(){
    $('#edit-form-sumit',Sblock).click(function(e){
   // e.preventDefault();
    var url="";    
    var base_url=Drupal.settings.basePath;
    SelectTid=$('#edit-field-loai-bds-tid',Sblock);
    SelectCid=$('#edit-field-fcity-target-id-1',Sblock);
    SelectTidParent=$('.view-id-list_bds_type .field-content div.active',Sblock);
    url+=nonvietnamese(SelectTidParent.text());
    if(SelectTid.val()!=null){
        url+='/'+nonvietnamese($('option[value="'+SelectTid.val()+'"]',SelectTid).text());
    }else {
         url+='/'+"tat-ca";
    }
    
    if(SelectCid.val()!=null){
    url+='/'+nonvietnamese($('option[value="'+SelectCid.val()+'"]',SelectCid).text());
    }
    
    $('#views-exposed-form-search-land-block').attr('method','POST');
    $('#views-exposed-form-search-land-block').attr('action',base_url+'tim-kiem/'+url);
    
    //alert($('#views-exposed-form-search-land-block').attr('action'));
    //$(this).unbind(event.preventDefault()).click();
   });
}
function search_view_header(){    
    Sblock=$('#block-views-search-land-block');
    var tabs= $('.view-header .view',Sblock);  
    
    $('.view-header li a',Sblock).click(function(e){
       $('.view-header .view',Sblock).removeClass('active');
      $(this).closest('.view').addClass('active');
      $('.view-id-search_land .field-content div.active').removeClass('active'); 
    });   
}
function init_bds_type(){
     $('.view-id-list_bds_type .views-row:first-child .field-content div').addClass('active');
     SelectTid=$('#edit-field-loai-bds-tid',Sblock);
     Tabs=$('.view-id-list_bds_type');
     current=SelectTid.val();
    
     tids=params.tids;
     for(i in tids){
        for(j in tids[i])
        {   if(j==current){
               $('.field-content div',Tabs).removeClass("active"); 
               $('.field-content div[id="'+i+'"]',Tabs).addClass("active");
            }
        }
     }
     Active_tid=$('.field-content div[class="active"]',Tabs).attr('id');
    
}
function set_default_bds_type(){
     init_bds_type();
     Tabs=$('.view-id-list_bds_type');
     $('.view-id-list_bds_type .views-row .field-content div').click(function(){    
     $('.field-content div',Tabs).removeClass("active"); 
     $(this).addClass("active");
     $('.view-header .view',Sblock).removeClass('active');
     $(this).closest('.view').addClass('active'); 
     $('.quicktabs-tabs li',Sblock).removeClass('active');
     //reset all field
     $('input[type="text"]',Sblock).val("");
     $('select',Sblock).val("All");
     });

}
function change_expose_form(){
    
    Tabs=$('#quicktabs-view__list_lands_by_city__block_2');
    Sblock=$('#block-views-search-land-block');
  
    Tid_popup();
    City_popup();
    District_popup();
    Price_popup();
    Square_popup();
    Project_popup();
    submit_form();
       
}
function Tid_popup(){
     
     tids=params.tids;
     SelectTid=$('#edit-field-loai-bds-tid',Sblock);
     SelectTidAlter=$('#edit-field-loai-bds-tid-input');
     //SelectTidAlter.val($('option[value="'+SelectTid.val()+'"]',SelectTid).text());
     SelectTidAlter.click(function(e){
     
     
     Tabs=$('.view-id-list_bds_type');
     Active_tid=$('.field-content div.active',Tabs).attr('id');  
     var content=""; 
     
     for(i in tids[Active_tid]){
        content+='<li data-tid="'+i+'">'+tids[Active_tid][i]+'</li>';
     }
     $('.select_bds_type',Sblock).remove();   
     $(this).after('<div class="select_bds_type" title="Lựa chọn loại BĐS">'+content+'</div>');
     Dialog=$('.select_bds_type',Sblock);
     Dialog.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
      
       $('li',Dialog).click(function(){
        var tid= $(this).attr('data-tid');
        SelectTid.val(tid);
        SelectTidAlter.val($('option[value="'+SelectTid.val()+'"]',SelectTid).text());
        Dialog.dialog('close').remove();
       });
     });
}

function City_popup(){
     Location=params.locations;
       
     SelectCid=$('#edit-field-fcity-target-id-1',Sblock);
     SelectCidAlter=$('#edit-field-fcity-target-id-1-input');
     SelectCidAlter.val($('option[value="'+SelectCid.val()+'"]',SelectCid).text());
      
     SelectDid=$('#edit-field-fdistrict-target-id',Sblock);
     SelectDidAlter=$('#edit-field-fdistrict-target-id-input',Sblock);
     
     CurrentCid=SelectCid.val();
     
    
     SelectCidAlter.click(function(e){
     SelectDidAlter.val("");
     SelectDid.val("All");
     
     var content=""; 
    
     for(i in Location){
        for(j in Location[i])
        {
            city=Location[i][j]['cname'];
        }
        content+='<li data-cid="'+i+'">'+city+'</li>';
     }
     $('.select_city',Sblock).remove();   
     $(this).after('<div class="select_city" title="Lựa chọn tỉnh thành phố">'+content+'</div>');
     
     
     DialogCity=$('.select_city',Sblock);
     DialogCity.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
       
       $('li',DialogCity).click(function(){
        var cid= $(this).attr('data-cid');
        SelectCid.val(cid);
        SelectCidAlter.val($('option[value="'+SelectCid.val()+'"]').text());
        DialogCity.dialog('close').remove();
       });
               
     });
}

function District_popup(){
     Location=params.locations;
     SelectCid=$('#edit-field-fcity-target-id-1',Sblock);  
     SelectDid=$('#edit-field-fdistrict-target-id',Sblock);
     SelectDidAlter=$('#edit-field-fdistrict-target-id-input',Sblock);

     var title="";
     for(i in Adids=SelectDid.val()){
        title+=$('option[value="'+Adids[i]+'"]',SelectDid).text() +", "; 
     } 
     SelectDidAlter.val(title);
     if(SelectDid.val()=="All")SelectDidAlter.val("");  
     SelectDidAlter.click(function(e){
     
     CurrentCid=SelectCid.val();
     var content='<div class="district-all">Tất cả</div>'; 
     Adids=SelectDid.val();       
     for(i in Location[CurrentCid]){
        checked="";
        for(j in Adids)
        {
              if(i==Adids[j]) {checked='checked';}
        }
        content+='<li data-did="'+i+'"><label><input '+checked+' type="checkbox" title="'+Location[CurrentCid][i]['dname']+'" class="select-did" value="'+i+'">'+Location[CurrentCid][i]['dname'];+'</label></li>';
     }
     $('.select_district',Sblock).remove();   
     $(this).after('<div class="select_district" title="Lựa chọn tỉnh thành phố">'+content+'</div>');
     
     
     DialogDistrict=$('.select_district',Sblock);
     DialogDistrict.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
       $('.district-all',DialogDistrict).click(function(){
        SelectDid.val('All');
        SelectDidAlter.val("");
        DialogDistrict.dialog('close').remove();
       });
       $('input',DialogDistrict).change(function(){
        var title="";
        dids = $("input:checkbox:checked",DialogDistrict).map(function(){
         title+=$(this).attr('title')+", ";   
        return $(this).val();
        }).toArray();
        SelectDid.val(dids);
        SelectDidAlter.val(title);
       });
               
     });
}

function Price_popup(){
    var Pricedata=[
        {'from':0,'to':200,'Ctitle':["0 triệu","200 triệu"],'currency':'\[0,1\]'},
        {'from':200,'to':500,'Ctitle':["200 triệu ","500 triệu"],'currency':'\[0,1\]'},
        {'from':500,'to':1000,'Ctitle':["500 triệu ","1 tỷ "],'currency':'\[0,1\]'},
        {'from':1,'to':2,'Ctitle':["1 tỷ","2 tỷ "],'currency':'\[2\]'},
    ];
    
    SPriceFrom=$('#edit-field-price-value-min',Sblock);
    SPriceTo=$('#edit-field-price-value-max',Sblock);
    SPriceCurrency=$('#edit-field-currency-value',Sblock);      
    SPriceAlter=$('#edit-field-price-value-input',Sblock);
    SPriceAlter.click(function(){
    var content='<div>';
    content+='<div class="price-all">Tất cả</div>';    
    for (i in Pricedata){
        var prefix= Pricedata[i]['Ctitle'][0];
        var subfix= Pricedata[i]['Ctitle'][1];  
        from=Pricedata[i]['from'];
        to=Pricedata[i]['to'];
        currency=Pricedata[i]['currency'];
        content+='<li id="'+i+'" data-from="'+from+'" data-to="'+to+'" data-currency="'+currency+'">' ;
        content+='Giá từ '+prefix+' đến '+subfix;
        content+='</li>';
        
    }
    content+='</div>';   
    $('.select_price',Sblock).remove();   
    $(this).after('<div class="select_price" title="Lựa chọn tỉnh thành phố">'+content+'</div>');
     
     DialogPrice=$('.select_price',Sblock);
     DialogPrice.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
       $('.price-all',DialogPrice).click(function(){
        SPriceFrom.val("");
        SPriceTo.val("");
        SPriceCurrency.val([0,1,2]);
        SPriceAlter.val("");
        DialogPrice.dialog('close').remove();
       });
       $('li',DialogPrice).click(function(){
        var from= $(this).data('from');
        var to= $(this).data('to');
        var currency =$(this).data('currency');
        SPriceCurrency.val(currency);
        console.log(currency);
        
        
        SPriceFrom.val(from);
        SPriceTo.val(to);
        SPriceAlter.val($(this).text());
        DialogPrice.dialog('close').remove();
       });
               
     });
        
 
    
    
 
}
function Square_popup(){
    var Squaredata=[
        {'from':0,'to':20},
        {'from':20,'to':50},
        {'from':50,'to':100},
    ];
    
    SSquareFrom=$('#edit-field-dien-tich-value-min',Sblock);
    SSquareTo=$('#edit-field-dien-tich-value-max',Sblock);      
    SSquareAlter=$('#edit-field-dien-tich-value-input',Sblock);
    SSquareAlter.click(function(){
    var content='<div>';
    content+='<div class="square-all">Tất cả</div>';    
    for (i in Squaredata){  
        from=Squaredata[i]['from'];
        to=Squaredata[i]['to'];
        content+='<li id="'+i+'" data-from="'+from+'" data-to="'+to+'">' ;
        content+='Diện tích từ '+from+'m2 đến '+to+'m2';
        content+='</li>';
        
    }
    content+='</div>';
    $('.select_square',Sblock).remove();   
    $(this).after('<div class="select_square" title="Lựa chọn tỉnh diện tích">'+content+'</div>');
     
    DialogSquare=$('.select_square',Sblock);
    DialogSquare.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
       $('.square-all',DialogSquare).click(function(){
        SSquareFrom.val("");
        SSquareTo.val("");
        SSquareAlter.val("");
        DialogSquare.dialog('close').remove();
       });
       $('li',DialogSquare).click(function(){
        var from= $(this).data('from');
        var to= $(this).data('to');
        
        SSquareFrom.val(from);
        SSquareTo.val(to);
        SSquareAlter.val($(this).text());
        DialogSquare.dialog('close').remove();
       });
      
    
    }); 
       
}
function Project_popup(){
     project=params.project;
     SelectCid=$('#edit-field-fcity-target-id-1',Sblock);  
     SelectDid=$('#edit-field-fdistrict-target-id',Sblock);
     SelectDidAlter=$('#edit-field-fdistrict-target-id-input',Sblock);
     SProject=$('#edit-field-project-target-id');
     SProjectAlter=$('#edit-field-project-target-id-input');
     SProjectAlter.click(function(){
     if(!SelectDid.val()){
        $('.notice').remove();
        $(this).append('<div class="notice">Bạn phải nhập quận huyện trước</div>');$('.notice').dialog({modal: true,});return;
        }
     Did=SelectDid.val();
     console.log(Did);  
     content="";
     for(i in project){
        console.log(project[i]);
        for(j in project[i]){
            for(id in Did){
            if(j==Did[id]){
               pid=project[i][j]['pid'];
               title=project[i][j]['pname'];
                checked="";
               for(k in Aproject=SProject.val()){
                if(pid==Aproject[k]){checked="checked";}
               } 
               content+='<li data-pdid="'+pid+'"><label><input '+checked+' type="checkbox" title="'+title+'" class="select-pdid" value="'+pid+'">'+title+'</label></li>';              
            }
           }
        }
     }
    $('.select_project',Sblock).remove();   
    $(this).after('<div class="select_project" title="Lựa chọn dự án">'+content+'</div>');
     
    DialogProject=$('.select_project',Sblock);
    DialogProject.dialog({
            modal: true,               
            draggable: true,
            resizable: true, 
            width: 400,
            height:300,
        
       });
     $('input',DialogProject).change(function(){
        var title="";
        pids = $("input:checkbox:checked",DialogProject).map(function(){
         title+=$(this).attr('title')+", ";   
        return $(this).val();
        }).toArray();
        SProject.val(pids);
        SProjectAlter.val(title);
       });        
        
     });

}
function nonvietnamese(str){
    str= str.toLowerCase();// chuyển chuỗi sang chữ thường để xử lý
    /* tìm kiếm và thay thế tất cả các nguyên âm có dấu sang không dấu*/
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");//cắt bỏ ký tự - ở đầu và cuối chuỗi
   return(str);
    
}
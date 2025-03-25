/**
 * jQuery EasyUI 1.5
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
(function($){

// Security validation helper function
function validateSeparator(value, name, maxLength) {
    maxLength = maxLength || 10;
    if (!value) return '';
    if (value.length > maxLength) {
        throw new Error(name + ' too long (max ' + maxLength + ' characters)');
    }
    // Only allow simple characters, no regex special chars
    if (!/^[a-zA-Z0-9\s._-]*$/.test(value)) {
        throw new Error(name + ' contains invalid characters');
    }
    return value;
}

// Core plugin functions
function _1(_2){
    var _3=$.data(_2,"numberbox");
    var _4=_3.options;
    $(_2).addClass("numberbox-f").textbox(_4);
    $(_2).textbox("textbox").css({imeMode:"disabled"});
    $(_2).attr("numberboxName",$(_2).attr("textboxName"));
    _3.numberbox=$(_2).next();
    _3.numberbox.addClass("numberbox");
    var _5=_4.parser.call(_2,_4.value);
    var _6=_4.formatter.call(_2,_5);
    $(_2).numberbox("initValue",_5).numberbox("setText",_6);
}

function _7(_8,_9){
    var _a=$.data(_8,"numberbox");
    var _b=_a.options;
    var _9=_b.parser.call(_8,_9);
    var _c=_b.formatter.call(_8,_9);
    _b.value=_9;
    $(_8).textbox("setText",_c).textbox("setValue",_9);
    _c=_b.formatter.call(_8,$(_8).textbox("getValue"));
    $(_8).textbox("setText",_c);
}

$.fn.numberbox=function(_d,_e){
    if(typeof _d=="string"){
        var _f=$.fn.numberbox.methods[_d];
        if(_f){
            return _f(this,_e);
        }else{
            return this.textbox(_d,_e);
        }
    }
    _d=_d||{};
    return this.each(function(){
        var _10=$.data(this,"numberbox");
        if(_10){
            $.extend(_10.options,_d);
        }else{
            _10=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_d)});
        }
        _1(this);
    });
};

$.fn.numberbox.methods={
    options:function(jq){
        var _11=jq.data("textbox")?jq.textbox("options"):{};
        return $.extend($.data(jq[0],"numberbox").options,{width:_11.width,originalValue:_11.originalValue,disabled:_11.disabled,readonly:_11.readonly});
    },
    fix:function(jq){
        return jq.each(function(){
            $(this).numberbox("setValue",$(this).numberbox("getText"));
        });
    },
    setValue:function(jq,_12){
        return jq.each(function(){
            _7(this,_12);
        });
    },
    clear:function(jq){
        return jq.each(function(){
            $(this).textbox("clear");
            $(this).numberbox("options").value="";
        });
    },
    reset:function(jq){
        return jq.each(function(){
            $(this).textbox("reset");
            $(this).numberbox("setValue",$(this).numberbox("getValue"));
        });
    }
};

$.fn.numberbox.parseOptions=function(_13){
    var t=$(_13);
    return $.extend({},$.fn.textbox.parseOptions(_13),$.parser.parseOptions(_13,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined)});
};

// Default options with security improvements
$.fn.numberbox.defaults=$.extend({},$.fn.textbox.defaults,{
    inputEvents:{
        keypress:function(e){
            var _18=$(this).numberbox("options");
            var s=$(this).numberbox("getText");

            // Length check to prevent excessive input
            if(s.length >= 1000) {
                return false;
            }

            // Basic input validation
            try {
                validateSeparator(_18.decimalSeparator, 'Decimal separator');
                validateSeparator(_18.groupSeparator, 'Group separator');
            } catch(e) {
                console.error('Invalid numberbox configuration:', e.message);
                return false;
            }

            // Allow control keys
            if(e.metaKey || e.ctrlKey){
                return true;
            }

            // Allow special keys (delete, backspace, enter, insert)
            if($.inArray(String(e.which),["46","8","13","0","45"])>=0){
                return true;
            }

            // Get the actual character safely
            var c = String.fromCharCode(e.which);
            if(!c){
                return true;
            }

            // Allow minus sign at start only
            if(c === "-"){
                return s.indexOf("-") === -1 && s.length === 0;
            }

            // Allow one decimal separator
            if(c === _18.decimalSeparator){
                return s.indexOf(_18.decimalSeparator) === -1;
            }

            // Allow group separator
            if(c === _18.groupSeparator){
                return true;
            }

            // Allow only digits
            return /[0-9]/.test(c);
        },
        blur:function(e){
            var _16=e.data.target;
            $(_16).numberbox("setValue",$(_16).numberbox("getText"));
        },
        keydown:function(e){
            if(e.keyCode==13){
                var _17=e.data.target;
                $(_17).numberbox("setValue",$(_17).numberbox("getText"));
            }
        }
    },
    min:null,
    max:null,
    precision:0,
    decimalSeparator:".",
    groupSeparator:"",
    prefix:"",
    suffix:"",
    formatter:function(_19){
        if(!_19){
            return _19;
        }
        _19=_19+"";

        // Maximum input length protection
        if(_19.length > 1000) {
            throw new Error("Input too long (max 1000 characters)");
        }

        var _1a=$(this).numberbox("options");

        // Validate all separators and affixes upfront
        try {
            validateSeparator(_1a.prefix, 'Prefix');
            validateSeparator(_1a.suffix, 'Suffix');
            validateSeparator(_1a.groupSeparator, 'Group separator');
            validateSeparator(_1a.decimalSeparator, 'Decimal separator');
        } catch(e) {
            console.error('Invalid numberbox configuration:', e.message);
            return _19;
        }

        var s1=_19, s2="";
        var _1b=_19.indexOf(".");
        if(_1b>=0){
            s1=_19.substring(0,_1b);
            s2=_19.substring(_1b+1,_19.length);
        }

        if(_1a.groupSeparator){
            // Format groups by splitting the string and joining
            var chars = s1.split('').reverse();
            var groups = [];
            for(var i = 0; i < chars.length; i += 3) {
                groups.push(chars.slice(i, i + 3).reverse().join(''));
            }
            s1 = groups.reverse().join(_1a.groupSeparator);
        }

        if(s2){
            return (_1a.prefix || '') + s1 + _1a.decimalSeparator + s2 + (_1a.suffix || '');
        }else{
            return (_1a.prefix || '') + s1 + (_1a.suffix || '');
        }
    },
    parser:function(s){
        if(typeof s!="string"){
            return s;
        }

        // Maximum input length protection
        if(s.length > 1000) {
            throw new Error("Input too long (max 1000 characters)");
        }

        s = $.trim(s);
        if(s === ""){
            return "";
        }
        if(s === "-" || s === "+"){
            return s;
        }

        var _1c = $(this).numberbox("options");

        // Validate all separators and affixes upfront
        try {
            validateSeparator(_1c.prefix, 'Prefix');
            validateSeparator(_1c.suffix, 'Suffix');
            validateSeparator(_1c.groupSeparator, 'Group separator');
            validateSeparator(_1c.decimalSeparator, 'Decimal separator');
        } catch(e) {
            console.error('Invalid numberbox configuration:', e.message);
            return _1c.value;
        }

        // Validate the input string format
        var validChars = "0123456789";
        var specialChars = "-+." + 
            (_1c.groupSeparator || "") + 
            (_1c.decimalSeparator || "") + 
            (_1c.prefix || "") + 
            (_1c.suffix || "");
        
        // Create a validation regex safely by escaping special characters
        var allowedCharsRegex = new RegExp("^[" + 
            validChars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + 
            specialChars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + 
            "]*$");
            
        if (!allowedCharsRegex.test(s)) {
            console.error('Invalid characters in input');
            return _1c.value;
        }

        // Process the input string using safe string operations
        if(_1c.prefix){
            s = s.split(_1c.prefix).join('');
            s = $.trim(s);
        }
        if(_1c.suffix){
            s = s.split(_1c.suffix).join('');
            s = $.trim(s);
        }
        
        // Remove group separators using safe string operations
        if(_1c.groupSeparator){
            s = s.split(_1c.groupSeparator).join('');
        }
        
        // Replace decimal separator with dot using safe string operations
        if(_1c.decimalSeparator && _1c.decimalSeparator !== '.'){
            s = s.split(_1c.decimalSeparator).join('.');
        }
        
        // Remove whitespace
        s = s.replace(/\s/g, '');

        // Validate numeric format before parsing
        var numericRegex = /^[-+]?\d*\.?\d*$/;
        if (!numericRegex.test(s)) {
            console.error('Invalid numeric format');
            return "";
        }

        // Parse and validate number
        var val = parseFloat(s);
        if(isNaN(val)){
            return "";
        }

        // Check for numeric range to prevent overflow
        if (!isFinite(val) || val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
            console.error('Number out of safe range');
            return "";
        }

        // Apply precision with safe numeric operations
        if(_1c.precision >= 0){
            try {
                val = Number(val.toFixed(_1c.precision));
            } catch(e) {
                console.error('Precision error:', e);
                return "";
            }
        }
        
        // Apply min/max constraints with safe numeric comparisons
        if(typeof (_1c.min) == "number" && !isNaN(_1c.min) && val < _1c.min){
            try {
                val = Number(_1c.min.toFixed(_1c.precision));
            } catch(e) {
                console.error('Error applying minimum value:', e);
                return "";
            }
        }
        if(typeof (_1c.max) == "number" && !isNaN(_1c.max) && val > _1c.max){
            try {
                val = Number(_1c.max.toFixed(_1c.precision));
            } catch(e) {
                console.error('Error applying maximum value:', e);
                return "";
            }
        }
        
        return val.toString();
            } else if(typeof (_1c.max) == "number" && val > _1c.max){
                val = _1c.max.toFixed(_1c.precision);
            }
            
            return val;
        }
    }
});

})(jQuery);
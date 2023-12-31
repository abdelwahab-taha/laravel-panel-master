$(document).ready(function () {

    const formValidation = {
        validation : {
            email : function (str){
                return formValidation.formats.emailFormat.test(String(str).toLowerCase());
            },
            double : function (str){
                return !formValidation.validation.empty(str) && !isNaN(str) && ($.isNumeric(str) ||
                    formValidation.formats.doubleFormat.test(str));
            },
            number : function (str){
                return !formValidation.validation.empty(str) && !isNaN(str) && $.isNumeric(str);
            },
            phone : function (str){
                return str.length > 9 && !isNaN(str) && $.isNumeric(str);
            },
            empty : function (str) {
                return (!str || str.length === 0 );
            }
        },
        formats : {
            emailFormat : /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            doubleFormat : /^[0-9]{0,3}(\.[0-9]{0,2})?$/
        }
    }

    let validated_elem = [];

    function form_activate(elem = $("body")) {
        elem.find(".system-data-form").each(function () {
            let form = $(this);
            let button = $(this).find("button[name='submit']");
            if(button.length){
                button.click(function () {
                    form_submit(form, button);
                });
            }
            $(this).unbind("keypress");
            $(this).keypress(function(e) {
                if(e.which === 13) {
                    if(!e.shiftKey){
                        if(button.length){
                            if(button.is(":disabled")){
                                return;
                            }
                        }else button = form;
                        form_submit(form, button);
                        e.preventDefault();
                    }
                }
            });
        });
        elem.find(".system-delete-btn").each(function () {
            if(!$(this).hasClass("system-btn-activated")){
                $(this).bind("activate", function (){
                    $(this).click(function (){
                        let afterLoad = function () {
                            window.location.reload();
                        };
                        let item = $(this);
                        let id = item.attr("data-id");
                        let uri = item.attr("data-uri");
                        let message = "delete item";
                        if(item.attr("data-message") !== undefined) message = item.attr("data-message");
                        askDelete(item, id, uri, afterLoad, message);
                    });
                    $(this).addClass("system-btn-activated");
                }).trigger("activate");
            }
        });
        elem.find("img.zoom").click(function () {
            let modalImage = $(".theme-image-modal");
            if(!modalImage.length){
                let modal = '\n' +
                    '<div class="modal fade theme-image-modal" tabindex="-1">\n' +
                    '    <div class="modal-dialog image-modal modal-lg">\n' +
                    '        <div class="modal-content">\n' +
                    '            <div class="modal-body">\n' +
                    '             <button type="button" class="image-modal-close" data-dismiss="modal" aria-label="Close">\n' +
                    '             <span aria-hidden="true">&times;</span>\n' +
                    '             </button>\n' +
                    '                <img src="" />\n' +
                    '           </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
                $("body").append(modal);
                modalImage = $(".theme-image-modal");
            }
            modalImage.find("img").attr("src", $(this).attr("src"));
            modalImage.modal("show");
        });
        let effectors = "";
        elem.find(".select-data-effect").each(function (){
            if(!$(this).hasClass("click-function-activated")) {
                $(this).change(function () {
                    if($(this).hasClass("validated")){
                        $(this).trigger("validate");
                    }
                    $($(this).attr("data-effects")).attr($(this).attr("data-attr"),
                        $(this).val()).trigger("reload_select");
                    effectors += effectors === "" ? $(this).attr("data-effects") : " ," + $(this).attr("data-effects");
                });
                if(!$(this).hasClass("deactivate-trigger")){
                    $(this).trigger("change");
                }
                $(this).addClass("click-function-activated");
            }
        });
        elem.find(effectors).each(function (){
            if(!$(this).hasClass("click-function-activated")){
                $(this).bind("reload_select", function () {
                    let target = $(this);
                    target.text("loading.....");
                    target.attr("disabled", true);
                    let id = target.attr("data-id");
                    let type = target.attr("data-type");
                    let selected = target.attr("data-selected") === undefined ? 0 : target.attr("data-selected");
                    $.ajax({
                        type: "POST",
                        url: systemInfo.API_URL + "select-loader?API_KEY=" + systemInfo.API_KEY
                            + "&type="+type+"&id="+id+"&selected="+selected,
                        data: {},
                        processData: false,
                        contentType: false,
                        success: function (msg) {
                            target.html(msg);
                            target.attr("disabled", false);
                        }, error: function () {
                            target.attr("disabled", false);
                        }
                    });
                }).trigger("reload_select");
                $(this).addClass("click-function-activated");
            }
        });
        validated_elem.push(elem);
    }

    function askDelete(item, id, uri, afterLoad = null, head = "delete item"){
        let delete_modal = $(".delete-modal");
        if(!delete_modal.length){
            let modal = '\n' +
                '<div class="modal fade delete-modal" tabindex="-1">\n' +
                '    <div class="modal-dialog">\n' +
                '        <div class="modal-content">\n' +
                '            <div class="modal-header">\n' +
                '                <h5 class="modal-title">' + head + '</h5>\n' +
                '                <button type="button" class="btn-close me-auto" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
                '            </div>\n' +
                '            <div class="modal-body">\n' +
                '                <div class="container-fluid">\n' +
                '                    <div class="row">\n' +
                '                        <div class="col-12 message">\n' +
                '                        </div>\n' +
                '                        <div class="col-6">\n' +
                '                            <button type="button" class="btn btn-success full-width delete-yes" data-id="0">yes</button>\n' +
                '                        </div>\n' +
                '                        <div class="col-6">\n' +
                '                            <button type="button" class="btn btn-danger full-width" data-dismiss="modal">no</button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $("body").append(modal);
            delete_modal = $(".delete-modal");
            delete_modal.find(".delete-yes").click(function (){
                let dom = $(this);
                let message = delete_modal.find(".message");
                dom.attr("disabled", true);
                $.ajax({
                    type: "POST",
                    url: systemInfo.home_url + "/api/delete/" + uri,
                    data: {
                        id : dom.attr("data-id"),
                        API_KEY : systemInfo.API_KEY
                    },
                    success: function (msg) {
                        let data = null;
                        try {
                            data = JSON.parse(msg);
                        } catch (err) {
                            dom.attr("disabled", false);
                            message.html('<div class="alert alert-danger" role="alert">response error</div>');
                            return;
                        }
                        if(data.message === undefined || data.error === undefined){
                            dom.attr("disabled", false);
                            message.html('<div class="alert alert-danger" role="alert"> undefined </div>');
                            return;
                        }
                        if(!data.error){
                            dom.attr("disabled", false);
                            message.html('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                            return;
                        }
                        if(data.redirect !== undefined){
                            window.location = data.redirect;
                            return;
                        }
                        if(data.reload !== undefined){
                            window.location.reload();
                            return;
                        }
                        if(data.trigger !== undefined){
                            Object.keys(data.trigger).forEach(function(key) {
                                $(key).trigger(data.trigger[key]);
                            });
                        }
                        if(data.html !== undefined){
                            Object.keys(data.html).forEach(function(key) {
                                $(key).html(data.html[key]);
                            });
                        }
                        if(data.attr !== undefined){
                            for (const [dom, value] of Object.entries(data.attr)) {
                                for (const [attribute, newValue] of Object.entries(value)) {
                                    $(dom).attr(attribute, newValue);
                                }
                            }
                        }
                        if(data.enabled === undefined){
                            $(".delete-effects").attr("disabled", true).attr("href", "#").addClass("disabled");
                        }else{
                            dom.attr("disabled", false);
                            delete_modal.modal("hide");
                        }
                        if(afterLoad !== null) afterLoad();
                        delete_modal.modal("hide");
                        dom.attr("disabled", false);
                    },error: function(){
                        dom.attr("disabled", false);
                        message.html('<div class="alert alert-danger" role="alert"> error</div>');
                    }
                });
            });
        }
        delete_modal.find(".modal-title").text(head);
        delete_modal.find(".delete-yes").attr("data-id", id);
        delete_modal.modal("show");
    }

    form_activate();

    function form_submit(form, btn, URL = null, afterSuccess = null){
        let formData = new FormData(), hasFiles = false;
        if(btn !== null) btn.attr("disabled", true);
        formData.append("current_page", systemInfo.CURRENT_URL);
        form.find("input:not(.skip-input), select:not(.skip-input), textarea:not(.skip-input)").each(function (e, t) {
            if($(this).attr("type") === "file"){
                if($(this).get(0).files.length !== 0){
                    formData.append($(this).attr("name"), $(this).get(0).files[0]);
                    hasFiles = true;
                }
            }else if($(this).attr("type") === "checkbox" || $(this).attr("type") === "radio"){
                if($(this).is(":checked")){
                    formData.append($(this).attr("name"), $(this).val());
                }
            }else formData.append($(this).attr("name"), $(this).val());
        });
        URL = form.attr("data-target");
        let message = form.find(".form-message");
        message = message.length ? message : null;
        form_pass(hasFiles, btn, formData, URL, message, form, afterSuccess)
    }

    function form_pass(hasFiles, btn, formData, URL, message, form = $("body"), after_success = null){
        let loadModal = false;
        if(message === null){
            loadModal = true;
        }
        if(hasFiles){
            $.ajax({
                type: "POST",
                url: URL,
                data: formData,
                async: true,
                success: function(msg){
                    let data = null;
                    try {
                        data = JSON.parse(msg);
                    }catch(err) {
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg('response error');
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">response error</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(data.message === undefined || data.error === undefined){
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg('undefined');
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">undefined</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(!data.error){
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg(data.message);
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(data.reload !== undefined){
                        window.location.reload();
                        return;
                    }
                    if(data.redirect !== undefined){
                        window.location = data.redirect;
                        return;
                    }
                    if(data.fill !== undefined){
                        Object.keys(data.fill).forEach(function(key) {
                            $("." + key).attr("src", data.fill[key]);
                        });
                    }
                    if(data.trigger !== undefined){
                        Object.keys(data.trigger).forEach(function(key) {
                            $(key).trigger(data.trigger[key]);
                        });
                    }
                    if(data.html !== undefined){
                        Object.keys(data.html).forEach(function(key) {
                            $(key).html(data.html[key]);
                        });
                    }
                    if(data.attr !== undefined){
                        for (const [elem, value] of Object.entries(data.attr)) {
                            for (const [attribute, newValue] of Object.entries(value)) {
                                $(elem).attr(attribute, newValue);
                            }
                        }
                    }
                    let emptyForm = $("input[name='empty-form-check']");
                    if(emptyForm.length){
                        if(emptyForm.is(":checked")){
                            form.find("input[type='text'], input[type='email'], select, input[type='number'], textarea").val("");
                        }
                    }
                    if(btn !== null) btn.attr("disabled", false);
                    if(loadModal){
                        alert_msg(data.message);
                    }else{
                        message.html('<div class="alert alert-success" role="alert">' + data.message + '</div>');
                    }
                    if(after_success !== null){
                        after_success();
                    }
                    if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                    if($(".modal.show").length){
                        $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                    }
                },error: function(){
                    if(btn !== null) btn.attr("disabled", false);
                    if(loadModal){
                        alert_msg('response error');
                    }else{
                        message.html('<div class="alert alert-danger" role="alert">response error</div>');
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }else{
            $.ajax({
                type: "POST",
                url: URL,
                data: formData,
                processData: false,
                contentType: false,
                success: function(msg){
                    let data = null;
                    try {
                        data = JSON.parse(msg);
                    }catch(err) {
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg('response error');
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">response error</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(data.message === undefined || data.error === undefined){
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg('undefined');
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">undefined</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(!data.error){
                        if(btn !== null) btn.attr("disabled", false);
                        if(loadModal){
                            alert_msg(data.message);
                        }else{
                            message.html('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                        }
                        if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                        return;
                    }
                    if(data.reload !== undefined){
                        window.location.reload();
                        return;
                    }
                    if(data.redirect !== undefined){
                        window.location = data.redirect;
                        return;
                    }
                    if(data.fill !== undefined){
                        Object.keys(data.fill).forEach(function(key) {
                            $("." + key).attr("src", data.fill[key]);
                        });
                    }
                    if(data.trigger !== undefined){
                        Object.keys(data.trigger).forEach(function(key) {
                            $(key).trigger(data.trigger[key]);
                        });
                    }
                    if(data.html !== undefined){
                        Object.keys(data.html).forEach(function(key) {
                            $(key).html(data.html[key]);
                        });
                    }
                    if(data.attr !== undefined){
                        for (const [elem, value] of Object.entries(data.attr)) {
                            for (const [attribute, newValue] of Object.entries(value)) {
                                $(elem).attr(attribute, newValue);
                            }
                        }
                    }
                    let emptyForm = $("input[name='empty-form-check']");
                    if(emptyForm.length){
                        if(emptyForm.is(":checked")){
                            form.find("input[type='text'], input[type='email'], select, input[type='number'], textarea").val("");
                        }
                    }
                    if(btn !== null) btn.attr("disabled", false);
                    if(loadModal){
                        alert_msg(data.message);
                    }else{
                        message.html('<div class="alert alert-success" role="alert">' + data.message + '</div>');
                    }
                    if(after_success !== null){
                        after_success();
                    }
                    if(form !== null) $('html, body').animate({scrollTop: form.offset().top - 120}, 'fast');
                    if($(".modal.show").length){
                        $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                    }
                },
                error: function(){
                    if(btn !== null) btn.attr("disabled", false);
                    if(loadModal){
                        alert_msg('response error');
                    }else{
                        message.html('<div class="alert alert-danger" role="alert">response error</div>');
                        if($(".modal.show").length){
                            $(".modal.show").animate({ scrollTop: 0 }, 'slow');
                        }
                    }
                },
            });
        }

    }

    function html_dialog(html, head = "", afterLoad = null){
        let alert_modal = $(".dialog-modal");
        if(!alert_modal.length){
            let modal = '\n' +
                '<div class="modal fade dialog-modal" tabindex="-1">\n' +
                '    <div class="modal-dialog">\n' +
                '        <div class="modal-content">\n' +
                '            <div class="modal-header">\n' +
                '                <h5 class="modal-title">' + head + '</h5>\n' +
                '                <button type="button" class="btn-close me-auto" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
                '            </div>\n' +
                '            <div class="modal-body">\n' +
                '                <div class="container-fluid data-html">\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $("body").append(modal);
            alert_modal = $(".dialog-modal");
        }
        alert_modal.find(".modal-title").html(head);
        alert_modal.find(".data-html").html(html);
        form_activate(alert_modal);
        alert_modal.modal("show");
    }

    function form_dialog(form_inputs, head = "", afterLoad = null){
        let alert_modal = $(".form-modal");
        let input = "";
        form_inputs.forEach(function (val){
            input += '<input type="' + val.type + '" class="form-input dialog-value" name="' + val.name
                + '" value="' + val.val + '" placeholder="' + val.placeholder + '">\n';

        });
        input += '<input type="hidden" class="form-input dialog-value" value="' + systemInfo.API_KEY + '" name="API_KEY">\n';

        if(!alert_modal.length){
            let modal = '\n' +
                '<div class="modal fade form-modal" tabindex="-1">\n' +
                '    <div class="modal-dialog">\n' +
                '        <div class="modal-content">\n' +
                '            <div class="modal-header">\n' +
                '                <h5 class="modal-title">' + head + '</h5>\n' +
                '                <button type="button" class="btn-close me-auto" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
                '            </div>\n' +
                '            <div class="modal-body">\n' +
                '                <div class="container-fluid">\n' +
                '                    <div class="row">\n' +
                '                        <div class="col-12 alert-message"></div>\n' +
                '                        <div class="col-12">\n' +
                '                        <div class="dialog-msg"></div>\n' +
                '                        <div class="dialog-form"><form class="dialog-form-data">\n' + input  + ' </form></div>\n' +
                '                        <button type="button" class="btn btn-primary dialog-save">save</button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $("body").append(modal);
            alert_modal = $(".form-modal");
        }
        alert_modal.find(".modal-title").html(head);
        alert_modal.find(".dialog-form-data").html(input);
        alert_modal.find(".dialog-save").unbind("click");
        alert_modal.find(".dialog-save").click(function () {

            let formData = new FormData(), hasFiles = false;
            $(this).attr("disabled", true);
            alert_modal.find(".dialog-form-data").find("input:not(.select-data-search), select, textarea").each(function (e, t) {
                if($(this).attr("name") != "empty-form-check"){
                    if($(this).attr("type") === "file"){
                        if($(this).get(0).files.length !== 0){
                            formData.append($(this).attr("name"), $(this).get(0).files[0]);
                            hasFiles = true;
                        }
                    }else if($(this).attr("type") === "checkbox" || $(this).attr("type") === "radio"){
                        if($(this).is(":checked")){
                            formData.append($(this).attr("name"), $(this).val());
                        }
                    }else formData.append($(this).attr("name"), $(this).val());
                }
            });
            form_pass(hasFiles, $(this), formData, systemInfo.API_URL + "/dialogs", alert_modal.find(".alert-message"), null, afterLoad);
        });
        alert_modal.keypress(function(e) {
            if(e.which === 13) {
                if(!e.shiftKey){
                    alert_modal.find(".dialog-save").trigger("click");
                }
            }
        });
        alert_modal.modal("show");
    }

    function alert_msg(msg, head = "تنبية", useBoxes = false){
        let alert_modal = $(".alert-modal");
        if(!alert_modal.length){
            let modal = '\n' +
                '<div class="modal fade alert-modal" tabindex="-1">\n' +
                '    <div class="modal-dialog">\n' +
                '        <div class="modal-content">\n' +
                '            <div class="modal-body">\n' +
                '                <div class="container-fluid">\n' +
                '                    <div class="row">\n' +
                '                        <div class="col-md-8 alert-message">\n' +
                '                        </div>\n' +
                '                        <div class="col-md-4">\n' +
                ' <button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            $("body").append(modal);
            alert_modal = $(".alert-modal");
        }
        alert_modal.modal("show").find(".alert-message").html(useBoxes ? "<div class='alert alert-warning'>" + msg + "</div>": msg);
    }

    $(".search-list").each(function () {
        let list = $(this);
        let inputName = list.attr("data-name");
        let multi = list.attr("data-multi") === "true";
        list.bind("dismiss", function () {
            list.find("input[type='hidden']").remove();
            list.find("a").removeClass("hide");
            list.find("input[name='search']").val("");
            list.find("a:not(.selected)").removeClass("active");
        });
        list.find("input[name='search']").on('input', function () {
            let search = $(this).val();
            if(search === ""){
                list.find("a").removeClass("hide");
                return;
            }
            list.find("a").each(function () {
                if($(this).text().includes(search)){
                    $(this).removeClass("hide");
                }else{
                    $(this).addClass("hide");
                }
            });
        });
        list.find("a").click(function () {
            if($(this).hasClass("active")){
                let id = "select-";
                if(multi){
                    id += inputName + "-" + $(this).attr("data-id");
                    $("#" + id).remove();
                }else{
                    id += inputName;
                    $("#" + id).val("");
                }
                $(this).removeClass("active");
            }else{
                let input = $("input[name='" + inputName + "']");
                if(input.length){
                    if(multi){
                        input = input.clone();
                        input.val($(this).attr("data-id"));
                        list.append(input);
                        $(this).addClass("active");
                    }else{
                        input.val($(this).attr("data-id"));
                        list.find("a").removeClass("active");
                        $(this).addClass("active");
                    }
                    return;
                }
                let html = "", id = "select-";
                if(multi){
                    id += inputName + "-" + $(this).attr("data-id");
                    html = "<input id='" + id +
                        "' type='hidden' name='" + inputName + "[]' value='" + $(this).attr("data-id") + "'>";
                }else{
                    id += inputName;
                    html = "<input id='" + id + "' type='hidden' name='" + inputName + "' value='" + $(this).attr("data-id") + "'>";
                }
                list.append(html);
                $(this).addClass("active")
            }
        });
        list.find(".selected").trigger("click");
    });

    $(".system-data-form").find('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
        if($($(this).attr("href")).find(".search-list").length)
            $($(this).attr("href")).find(".search-list").trigger("dismiss");
    });

    let activated = false, initial = false;

    let audioChunks = [];
    let rec;

    const taskRequest = {
        files: [],
        audios: [],
    };

    $(".record-audio").click(function () {
        let btn = $(this);
        if(!initial || btn.attr("data-on-start") === undefined){
            btn.attr("data-on-start", btn.text().replace(/^\s+|\s+$/g, ''))
            initial = true;
        }
        let btnDefaultText = btn.attr("data-on-start"), btnPauseText = btn.attr("data-on-pause");
        async function getUserMedia(constraints) {
            if (window.navigator.mediaDevices) {
                return window.navigator.mediaDevices.getUserMedia(constraints);
            }
            let legacyApi =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;
            if (legacyApi) {
                return new Promise(function (resolve, reject) {
                    legacyApi.bind(window.navigator)(constraints, resolve, reject);
                });
            } else {
                alert("user api not supported");
            }
        }
        function handlerFunction(stream) {
            rec = new MediaRecorder(stream);
            rec.start();
            rec.ondataavailable = (e) => {
                audioChunks.push(e.data);
                if (rec.state == "inactive") {
                    let blob = new Blob(audioChunks, { type: "audio/mp3" });
                    taskRequest.audios[createAudioStream($(".audios-list"), URL.createObjectURL(blob))] = blob;
                }
            };
        }
        function startUsingBrowserMicrophone(boolean, afterAllow) {
            getUserMedia({ audio: boolean }).then((stream) => {
                handlerFunction(stream);
                afterAllow();
            }).catch((error) => {
                alert("please allow your audio device");
            });
        }

        if(activated){
            rec.stop();
            btn.html('<i class="fa fa-play"></i> ' + btnDefaultText);
            activated = false;
        }else{
            audioChunks = [];
            startUsingBrowserMicrophone(true, function () {
                btn.html('<i class="fa fa-pause"></i> ' + btnPauseText);
                activated = true;
            });
        }
    });

    let audioId = 1;

    function createAudioStream(elem, audio, id = ""){
        id = id === "" ? "audio-" + audioId : id
        elem.append('<div id="' + id + '" data-id="' + audioId + '"><audio src="' + audio + '" controls></audio><a href="#"><i class="fa fa-times"></i></a></div>');
        $("#"+id).find("a").click(function () {
            let activeId = parseInt(elem.find("#"+id).attr("data-id"));
            elem.find("#"+id).remove();
            taskRequest.audios.splice(activeId, 1)
        })
        return audioId++;
    }

    $(".upload-file").click(function () {
        $("input[name='uploader']").trigger("click");
    });

    $("input[name='uploader']").change(function () {
        if($(this).get(0).files.length !== 0){
            for (let i = 0; i < $(this).get(0).files.length; i++){
                let file = $(this).get(0).files[i];
                taskRequest.files[uploadSystemFile($(".files-list"), file)] = file;
            }
        }else{
            alert_msg("invalid file");
        }
    });

    let fileId = 1;

    function uploadSystemFile(elem, file){
        let id = "file-" + fileId;
        elem.append('<div id="' + id + '" data-id="' + fileId + '">\n<a href="#" class="btn btn-outline-primary file-btn">\n' +
            '<i class="fa fa-file-archive-o"></i>\n' +
            '' + file.name +
            '</a><a class="del" href="#"><i class="fa fa-times"></i></a></div>');
        $("#"+id).find(".del").click(function () {
            let activeId = parseInt(elem.find("#"+id).attr("data-id"));
            elem.find("#"+id).remove();
            taskRequest.files.splice(activeId, 1);
        });
        $("#"+id).find(".file-btn").click(function () {
            let activeId = parseInt(elem.find("#"+id).attr("data-id"));
            window.open(URL.createObjectURL(taskRequest.files[activeId]), '_blank');
        });
        return fileId++;
    }
    
    $("button[name='task_submit']").click(function () {
        let btn = $(this), def = btn.text();
        $(this).attr("disabled", true).text("sending....");
        let formData = new FormData();
        taskRequest.audios.forEach(function(val){
            formData.append("audios[]", val);
        })
        taskRequest.files.forEach(function(val){
            formData.append("files[]", val);
        })
        let form = btn.closest("form");
        if(form.find("input[name='respond_to']").length){
            formData.append("respond_to", btn.closest("form").find("input[name='respond_to']").val());
        }
        formData.append("content", $("textarea[name='content']").val());
        formData.append("API_KEY", systemInfo.API_KEY);
        form.find("input[name='group'], input[name='group[]']").each(function () {
            formData.append("group[]", $(this).val());
        });
        let progress = $(".task-progress-bar");
        progress.removeClass('hide');
        $.ajax({
            xhr: function() {
                let xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        let percentComplete = evt.loaded / evt.total;
                        let current = percentComplete * 100;
                        progress.attr("aria-valuenow", current).find(".progress-bar").css({
                            width: current + '%'
                        });
                        if (percentComplete === 1) {
                            progress.addClass('hide');
                        }
                    }
                }, false);
                xhr.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        let percentComplete = evt.loaded / evt.total;
                        let current = percentComplete * 100;
                        progress.attr("aria-valuenow", current).find(".progress-bar").css({
                            width: current + '%'
                        });
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: systemInfo.home_url + "/api/sendTask",
            data: formData,
            success: function(msg){
                let data = null;
                try {
                    data = JSON.parse(msg);
                    if(data["message"] === undefined){
                        window.location.reload();
                    }else{
                        alert_msg(data["message"]);
                    }
                    btn.attr("disabled", false).text(def);
                }catch(err) {
                    alert_msg("response error");
                    btn.attr("disabled", false).text(def);
                }
            },error: function(){
                alert_msg("request failed");
                btn.attr("disabled", false).text(def);
            },
            cache: false,
            contentType: false,
            processData: false
        });
        /*
        $.ajax({
            type: "POST",
            url: systemInfo.home_url + "/api/sendTask",
            data: data,
            async: true,
            success: function(msg){
                let data = null;
                try {
                    data = JSON.parse(msg);
                    if(data["message"] === undefined){
                        window.location.reload();
                    }else{
                        alert_msg(data["message"]);
                    }
                    btn.attr("disabled", false).text(def);
                }catch(err) {
                    alert_msg("response error");
                    btn.attr("disabled", false).text(def);
                }
            },error: function(){
                alert_msg("request failed");
                btn.attr("disabled", false).text(def);
            },
            cache: false,
            contentType: false,
            processData: false
        });
         */
    });

    $(".show-password").click(function () {
        if($(this).prev("input").attr("type") === "text"){
            $(this).removeClass("fa-eye-slash");
            $(this).addClass("fa-eye");
            $(this).prev("input").attr("type", "password");
        }else{
            $(this).removeClass("fa-eye");
            $(this).addClass("fa-eye-slash");
            $(this).prev("input").attr("type", "text");
        }
    });

});


function draw_charts(id, labels, datasets) {
    new Chart(document.getElementById(id).getContext("2d"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            legend: false
        }
    });
}

function getDataSet(dataset, label = "chart", color = true){
    return color ? {
        label: label,
        data: dataset,
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        pointBorderColor: 'rgba(33, 150, 243, 1)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 1
    } : {
        label: label,
        data: dataset,
        borderColor: 'rgba(30, 208, 133, 1)',
        backgroundColor: 'rgba(30, 208, 133, 0.2)',
        pointBorderColor: 'rgba(30, 208, 133, 1)',
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 1
    };
}
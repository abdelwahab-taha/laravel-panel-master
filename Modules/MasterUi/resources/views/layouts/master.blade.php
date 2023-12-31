<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="<?= $meta_description ?? '' ?>">
    <meta name="keywords" content="<?= $meta_keywords ?? '' ?>">
    <meta name="author" content="<?= $meta_author ?? '' ?>">
    <meta name="viewport" content="<?= $meta_viewport ?? '' ?>"/>
    <link rel="icon" type="image/x-icon" href="<?= $meta_icon ?? '' ?>">
    <title><?= $page_title ?? 'Login' ?></title>
    <style>
        :root {
            --main_color: #0a0908;
            --main_transpearnt_color: rgba(10, 9, 8, 0.6);
            --sec_color: #086788;
            --sec_transpearnt_color: rgba(8, 103, 136, 0.8);
            --third_color: #f4faf7;
            --third_color_transparent: rgba(244, 250, 247, 0.8);
            --forth_color: #f4fffb;
            --forth_transpearnt_color: rgba(244, 255, 251, 0.8);
            --forth_transpearnt_color_less: rgba(244, 255, 251, 0.7);
            --fifth_color: #f2f2f2;
            --content_background: url("{{ asset("") }}");
        }
    </style>
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/bootstrap.min.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/style.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/responsive.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/bootstrap-select.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/perfect-scrollbar.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/custom.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ asset("assets/css/semantic.min.css") }}">
</head>
<body class="inner_page login">

@yield('content')

<script src="{{ asset("assets/js/jquery.min.js") }}"></script>
<script src="{{ asset("assets/js/popper.min.js") }}"></script>
<script src="{{ asset("assets/js/bootstrap.min.js") }}"></script>
<script src="{{ asset("assets/js/animate.js") }}"></script>
<script src="{{ asset("assets/js/bootstrap-select.js") }}"></script>
<script src="{{ asset("assets/js/perfect-scrollbar.min.js") }}"></script>
<script src="{{ asset("assets/js/custom.js") }}"></script>
<!-- <script href="{{ asset("assets/js/forms.js") }}"></script> -->
<script type="module" src="{{ asset("js/forms/initial.js") }}"></script>
</body>
</html>

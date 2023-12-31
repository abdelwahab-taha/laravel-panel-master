@extends('masterui::layouts.master')

@section('content')
    <div class="full_container">
        <div class="container">
            <div class="center verticle_center full_height">
                <div class="login_section">
                    <div class="logo_login">
                        <div class="center">
                            <img height="100px" src="{{asset("assets/images/logo/logo.png")}}" alt="#" />
                        </div>
                    </div>
                    <div class="login_form">
                        <form class="system-data-form" action="{{url("api/master/auth")}}">
                            <fieldset>
                                <div class="field">
                                    <label for="email" class="label_field">Email</label>
                                    <input id="email" type="email" name="email" placeholder="E-mail or Username" />
                                </div>
                                <div class="field show-hide-password">
                                    <label for="password" class="label_field">Password</label>
                                    <input id="password" type="password" name="password" placeholder="Password" />
                                    <i class="fa fa-eye show-password"></i>
                                </div>
                                <div class="field">
                                    <label for="name" class="label_field">name</label>
                                    <input id="name" type="text" name="name[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="name" class="label_field">name</label>
                                    <input id="name" type="text" name="name[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="name" class="label_field">name</label>
                                    <input id="name" type="text" name="name[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="check" class="label_field">name</label>
                                    <input id="check" type="checkbox" value="1" name="check[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="check" class="label_field">name</label>
                                    <input id="check" type="checkbox" value="2" name="check[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="check" class="label_field">name</label>
                                    <input id="check" type="checkbox" value="3" name="check[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="check" class="label_field">image</label>
                                    <input id="check" type="file" name="image[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field">
                                    <label for="check" class="label_field">name</label>
                                    <input id="check" type="file" name="image[]" placeholder="E-mail or Username" />
                                </div>
                                <div class="field margin_0">
                                    <button name="submit" class="main_bt login-btn" type="submit">
                                        <i class="fa fa-sign-in"></i>
                                        Sing In
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

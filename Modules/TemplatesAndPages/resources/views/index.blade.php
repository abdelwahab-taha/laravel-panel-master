@extends('templatesandpages::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('templatesandpages.name') !!}</p>
@endsection

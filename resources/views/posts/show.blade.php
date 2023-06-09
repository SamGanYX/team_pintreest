<x-app-layout>
    <div style="padding-left: 20%; padding-right: 20%; padding-top: 50px; width: 100%;">
        <p style="font-size: 64px; font-weight: 1000;"> {{$post->title}} </p>
        <div class="row" style="height: 400px;">
            <div style="float: left; width: 60%; text-align: center; height: 100%:">
                <img style="max-width: 100%; max-height:400px; height:400px;" src="/images/{{$post->image_name}}"></img>
            </div>
            <div style="float: left;">
                <p style="font-size: 20px; "> {{$post->message}} </p>
                <a class="btn btn-sm" href="/profile/save_post/{{$post->id}}">
                    <div class="save-button" style="">
                        Save
                    </div>
                </a>
            </div>
            
        </div>

    </div>
</x-app-layout>

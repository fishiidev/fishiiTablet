fx_version 'cerulean'
game 'gta5'
lua54 'yes'
description 'La mejor tablet en el mercado'
author 'elfishii#5544'
collaborator 'Medinaa#7364'
version '2.0.0'

shared_scripts {
    'config.lua',
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua',
    '@mysql-async/lib/MySQL.lua'
}

ui_page 'html/ui.html'

files {
    'html/*.html',
    'html/fonts/*.ttf',
    'html/fonts/*.otf',
    'html/css/*.css',
    'html/*.css',
    'html/js/*.js',
    'html/*.js',
    'html/*.ogg',
}

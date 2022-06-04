ESX = exports['es_extended']:getSharedObject()



RegisterCommand('fishiitablet', function(source, args, raw)
    ExecuteCommand( "e tablet" )
    SetNuiFocus(true,true)
    ESX.TriggerServerCallback('elfishii:callback', function(info, cb)
        local Player = info[1]
        local vehicles = info[2]
        local bills = info[3]
        for i=1, #vehicles do
            local vehicle = vehicles[i]
            vehicle.modelname = GetLabelText(GetDisplayNameFromVehicleModel(json.decode(vehicle.vehicle).model))
        end
        SendNUIMessage({
            citizenid = Player.source,
            nombre = Player.firstname .. ' ' .. Player.lastname,
            dob = Player.birthdate,
            efectivo = Player.money,
            banco = Player.bank,
            trabajo = Player.job.label,
            telefono =Player.phone,
            vehicles = vehicles,
            bills = bills,
            show = true
        })
    end)
end)

RegisterKeyMapping('fishiitablet', "Abrir Tablet", 'keyboard', 'F4')

RegisterCommand('tabletbug', function(source, args, raw)
    SetNuiFocus(false,false)
    SendNUIMessage({
        show = false
    })
end)

RegisterNUICallback('escape', function(data, cb)
    ExecuteCommand( "e c" )
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('payBill', function(data, cbNui)
    ESX.TriggerServerCallback('tablet:payBill', function(cb)
        cbNui(cb)
    end, data)
end)




RegisterNUICallback('getBills', function(data, cbNui)
    ESX.TriggerServerCallback('tablet:getBills', function(cb)
        cbNui(cb)
    end)
end)


AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() == resourceName) then
        SetNuiFocus(false,false)
        SendNUIMessage({
            show = false
        })
    end
end)


ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

-- Thanks to medinaa for most of the serverside and javascript code:)))

ESX.RegisterServerCallback('elfishii:callback', function(source, cb)
    local src = source
    local tonivsari = ESX.GetPlayerFromId(source)
    local citizenid = tonivsari.getIdentifier()
    local res = nil
    local res2 = nil

    tonivsari.firstname = tonivsari.get('firstName')
    tonivsari.lastname = tonivsari.get('lastName')
    tonivsari.money = tonivsari.getAccount('money').money
    tonivsari.bank = tonivsari.getAccount('bank').money

    MySQL.Async.fetchAll('SELECT * FROM users WHERE identifier = @citizenid',  {
        ['@citizenid'] = citizenid
    }, function(result)
        tonivsari.phone = result[1].phone_number
    end)

    MySQL.Async.fetchAll('SELECT * FROM owned_vehicles WHERE owner = @citizenid',  {
        ['@citizenid'] = citizenid
    }, function(result)
        res = result
    end)

    MySQL.Async.fetchAll('SELECT * FROM billing WHERE identifier = @citizenid',  {
        ['@citizenid'] = citizenid
    }, function(result)
        res2 = result
    end)

    Wait(200)
    cb({tonivsari, res, res2})
end)

ESX.RegisterServerCallback('tablet:payBill', function(source, cb, data)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer.getAccount('bank').money >= tonumber(data.amount) then

        MySQL.Async.fetchAll('SELECT target from billing WHERE identifier = @identifier AND label = @label AND amount = @amount AND id = @id', {
            ['@identifier'] = xPlayer.getIdentifier(),
            ['@label'] = data.label,
            ['@amount'] = data.amount,
            ['@id'] = data.id
        }, function(res)
            TriggerEvent('esx_addonaccount:getSharedAccount', res[1].target, function(account)
                xPlayer.showNotification('Has pagado la multa: ' .. data.label .. ' por $' .. data.amount)
                xPlayer.removeAccountMoney('bank', tonumber(data.amount) )
                account.addMoney(tonumber(data.amount))
                MySQL.Async.execute('DELETE FROM billing WHERE identifier = @identifier AND label = @label AND amount = @amount AND id = @id', {
                    ['@identifier'] = xPlayer.getIdentifier(),
                    ['@label'] = data.label,
                    ['@amount'] = data.amount,
                    ['@id'] = data.id
                }, function(result)
                    cb(true)
                end)
            end)
        end)
    else
        xPlayer.showNotification('No tienes suficiente dinero en el banco')
        cb(false)
    end
end)

ESX.RegisterServerCallback('tablet:getBills', function(source, cb)
    MySQL.Async.fetchAll('SELECT * FROM billing WHERE identifier = @citizenid',  {
        ['@citizenid'] = ESX.GetPlayerFromId(source).getIdentifier()
    }, function(result)
        cb(result)
    end)
end)

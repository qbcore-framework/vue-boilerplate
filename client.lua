local QBCore = exports['qb-core']:GetCoreObject()

-- NUI Callback

RegisterNUICallback('closeApp', function(data, cb)
    print(data.inputValue)
    SetNuiFocus(false, false)
    cb('ok')
end)

-- Command

RegisterCommand('vue', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openApp'
    })
end, false)

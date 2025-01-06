local loaded = false

AddEventHandler("playerSpawned", function ()
    if not loaded then
        ShutdownLoadingScreenNui()
        loaded = true
    end
end)

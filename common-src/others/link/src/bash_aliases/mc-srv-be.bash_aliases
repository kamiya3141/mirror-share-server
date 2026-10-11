alias rmba=". ~/my-*.bash_aliases && clear"
alias emba1="sudo nano ~/my-1.bash_aliases && rmba"

function update-be() {
        local url1="${1:-null}"
        if [ "${url1}" = "null" ]; then
                echo "Error: Please Input URL path."
                return 1
        else
                sudo systemctl stop mc-srv-be
                cd /srv
                sudo rm -r mc-srv-be.bak
                sudo mv mc-srv-be mc-srv-be.bak
                sudo mkdir mc-srv-be
                sudo chmod 755 mc-srv-be
                sudo chown ${USER}:${USER} mc-srv-be
                cd mc-srv-be
                sudo wget "${url1}"
                sudo unzip ./*

                sudo cp ../mc-srv-be.bak/server.properties ./server.properties
                sudo nano server.properties
                sudo cp ../mc-srv-be.bak/permissions.json ./permissions.json
                sudo rsync -aHAX ../mc-srv-be.bak/worlds ./ --progresss
                sudo rsync -aHAX ../mc-srv-be.bak/behavior_packs ./ --progress
                sudo rsync -aHAX ../mc-srv-be.bak/resource_packs ./ --progress
        fi
        return 0
}

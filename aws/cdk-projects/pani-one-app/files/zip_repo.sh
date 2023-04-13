SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo $SCRIPT_DIR
#mkdir repository-code
pushd $SCRIPT_DIR
zip -qr ./repository-code.zip .
popd
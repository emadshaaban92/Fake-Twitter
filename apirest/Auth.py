from tastypie.authorization import DjangoAuthorization
from tastypie.exceptions import Unauthorized


class UserObjectsOnlyAuthorization(DjangoAuthorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        return object_list#object_list.filter(user=bundle.request.user)

    def read_detail(self, object_list, bundle):
        # Is the requested object owned by the user?
        return True #bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        # Assuming their auto-assigned to ``user``.
        return object_list

    def create_detail(self, object_list, bundle):
        return True

    def update_list(self, object_list, bundle):
        allowed = []

        # Since they may not all be saved, iterate over them.
        for obj in object_list:
            if True :#obj.user == bundle.request.user:
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        if bundle.obj.tweeter_id == bundle.request.user.id :
            return True
        else :
            raise Unauthorized("Sorry, You can't Update this value.")

    def delete_list(self, object_list, bundle):
        # Sorry user, no deletes for you!
        #return object_list
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        #raise Unauthorized("Sorry, no deletes.")
        if bundle.obj.tweeter_id == bundle.request.user.id :
            return True
        else :
            raise Unauthorized("Sorry, no deletes.")
            
            
class UserDataOnlyAuthorization(DjangoAuthorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        return object_list#object_list.filter(user=bundle.request.user)

    def read_detail(self, object_list, bundle):
        # Is the requested object owned by the user?
        return True #bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        # Assuming their auto-assigned to ``user``.
        raise Unauthorized("Sorry, You can't create list of users at once.")

    def create_detail(self, object_list, bundle):
        return True

    def update_list(self, object_list, bundle):
        raise Unauthorized("Sorry, You can't update list of users at once.")
        
    def update_detail(self, object_list, bundle):
        if bundle.obj.id == bundle.request.user.id :
            return True
        else :
            raise Unauthorized("Sorry, You can't Update this value.")

    def delete_list(self, object_list, bundle):
        # Sorry user, no deletes for you!
        #return object_list
        raise Unauthorized("Sorry, no deletes.")

    def delete_detail(self, object_list, bundle):
        #raise Unauthorized("Sorry, no deletes.")
        raise Unauthorized("Sorry, no deletes.")

using System.Web;
using System.Web.Optimization;

namespace Landau.Blitz.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/bootstrap-dialog.min.js",
                "~/Scripts/mindmup-editabletable.js",
                "~/Scripts/numeric-input-example.js",
                "~/Scripts/bootstrap-notify.js",
                "~/Scripts/BootstrapMenu.min.js",
                "~/Scripts/lightbox.js",
                "~/Scripts/validator.min.js",
                "~/Scripts/validator.js"
                // "~/Scripts/bootstrap-datetimepicker.min.js"
                //
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-dialog.min.css",
                "~/Content/font-awesome.min.css",
                "~/Content/metisMenu.min.css",
                "~/Content/site.css",
                "~/Content/sb-admin-2.css",
                "~/Content/animate.css",
                "~/Content/bootstrap-table.css",
                "~/Content/bootstrap-editable.css",
                "~/Content/lightbox.css",
                "~/Scripts/chat/chat.css",
                "~/Content/chat_list.css",
                "~/Content/chk-multi-select.css",
                "~/Content/angular.treeview.css",
                "~/Content/tree-control.css",
                "~/Content/tree-control-attribute.css",
                "~/Content/tabs.css",
                "~/Content/tabs.sideways.css",
                "~/Content/ng-table.css",
                "~/Content/ng-right-click.css"


            //"~/Content/bootstrap-datetimepicker.min.css"
            ));

            //additional byndles for project
            bundles.Add(new ScriptBundle("~/bundles/sbadmin").Include(
                "~/Scripts/sb-admin-2.js",
                "~/Scripts/metisMenu.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap-table").Include(
                "~/Scripts/bootstrap-table.js",
                "~/Scripts/bootstrap-table-editable.js",
                "~/Scripts/bootstrap-editable.js",
                "~/Scripts/bootstrap-table-ru-Ru.js",
                "~/Content/bootstrap-table-context.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-ui-router.js",
                "~/Scripts/angular-messages.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-idle.js",
                "~/Scripts/angular-route.min.js",
                "~/Scripts/angular-ui-router-title.js",
                "~/Scripts/spin.js",
                "~/Scripts/angular-spinner.js",
                "~/Scripts/ui-bootstrap-tpls-2.1.3.min.js",
                "~/Scripts/notifier.js",
                "~/Scripts/mask.js",
                "~/Scripts/angularjs-dropdown-multiselect.min.js",
                "~/Scripts/chk-multi-select.js",
                "~/Scripts/angular.treeview.js",
                "~/Scripts/angular-tree-control.js",
                "~/Scripts/ng-table.js",
                "~/Scripts/smart-table.min.js",
                "~/Scripts/angular-content-editable.min.js",
                "~/Scripts/ng-right-click.js"
            
            ));

            bundles.Add(new ScriptBundle("~/bundles/blitzApp").Include(
                    "~/Scripts/app/Scripts/app.js",
                    "~/Scripts/app/Scripts/checklist-model.js",
                    "~/Scripts/app/Scripts/accessible-form.js",
                    "~/Scripts/app/Scripts/app-factories.js",
                    "~/Scripts/chat/chat.js",
                    "~/Scripts/chat/socketio.js",
                    "~/Scripts/app/Scripts/routeConfigurator.js",
                    "~/Scripts/app/Scripts/fileUploader.js",
                    "~/Scripts/app/Scripts/disposable.js"
                   
                )
            );

            bundles.Add(new ScriptBundle("~/bundles/blitzControllers")
                .IncludeDirectory("~/Scripts/app/Controllers", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/blitzInitServices")
                .IncludeDirectory("~/Scripts/app/Services/initializers", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/blitzServices")
                .IncludeDirectory("~/Scripts/app/Services", "*.js", false));
           
            
        }
    }
}

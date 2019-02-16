#import "AppDelegate.h"
#import <React/RCTRootView.h>

@interface AppDelegate ()

@end


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/app/index.bundle?platform=ios"];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  UIViewController *vc = [[UIViewController alloc] init];
  vc.view = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"App" initialProperties:nil launchOptions:launchOptions];
  
  self.window.rootViewController = vc;
  [self.window makeKeyAndVisible];
  
  return YES;
}

@end

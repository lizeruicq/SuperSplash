/****************************************************************************
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#import "View.h"
#import <Metal/Metal.h>

@implementation View

+ (Class)layerClass {
    return [CAMetalLayer class];
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        // Ensure layer setup is done on main thread
        if ([NSThread isMainThread]) {
            [self setupMetalLayer];
        } else {
            dispatch_sync(dispatch_get_main_queue(), ^{
                [self setupMetalLayer];
            });
        }
    }
    return self;
}

- (void)setupMetalLayer {
    CAMetalLayer *metalLayer = (CAMetalLayer *)self.layer;
    metalLayer.device = MTLCreateSystemDefaultDevice();
    metalLayer.pixelFormat = MTLPixelFormatBGRA8Unorm;
    metalLayer.framebufferOnly = YES;
    metalLayer.contentsScale = [UIScreen mainScreen].scale;
}

// Override layer property to ensure main thread access
- (CALayer *)layer {
    if ([NSThread isMainThread]) {
        return [super layer];
    } else {
        __block CALayer *result = nil;
        dispatch_sync(dispatch_get_main_queue(), ^{
            result = [super layer];
        });
        return result;
    }
}

// Custom method to safely get Metal layer on main thread
- (CAMetalLayer *)getMetalLayerSafely {
    if ([NSThread isMainThread]) {
        return (CAMetalLayer *)self.layer;
    } else {
        __block CAMetalLayer *result = nil;
        dispatch_sync(dispatch_get_main_queue(), ^{
            result = (CAMetalLayer *)self.layer;
        });
        return result;
    }
}

// Override touch handling methods to ensure they work properly
- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    // Forward to the engine's touch handling
    [super touchesBegan:touches withEvent:event];
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    // Forward to the engine's touch handling
    [super touchesMoved:touches withEvent:event];
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    // Forward to the engine's touch handling
    [super touchesEnded:touches withEvent:event];
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    // Forward to the engine's touch handling
    [super touchesCancelled:touches withEvent:event];
}

@end
